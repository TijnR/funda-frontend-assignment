# Funda assessment

A property browser for Dutch homes for sale, built on the Funda Partner API. It has two screens: a paginated listing overview and a detail page with a photo gallery, features and a map.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind v4.

## Getting started

```bash
cp .env.example .env   # add your FUNDA_API_KEY
pnpm install
pnpm dev
```

Open http://localhost:3000.

`FUNDA_API_KEY` is required. `FUNDA_API_ORIGIN` is optional and only exists to point the app at a test or acceptance environment.

### Scripts

| Command                     | What it does                            |
| --------------------------- | --------------------------------------- |
| `pnpm dev`                  | Dev server on port 3000                 |
| `pnpm build`                | Production build                        |
| `pnpm storybook`            | Storybook on port 6006                  |
| `pnpm test`                 | Unit tests plus Storybook browser tests |
| `pnpm test:unit`            | Unit tests only, no browser             |
| `pnpm lint` / `pnpm format` | oxlint and oxfmt                        |

A husky pre-commit hook runs oxfmt and oxlint over staged files.

## Rendering strategy

This is the part of the project I put the most thought into, and the part I would most like to talk through.

Both pages render a static shell and stream the data in. The page component itself stays synchronous, so the header, page title, skeleton and footer are part of the prerendered HTML. Everything that depends on the Funda feed sits behind a `<Suspense>` boundary:

```tsx
export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <main>
      <header>{/* prerendered */}</header>
      <Suspense fallback={<ListingsSkeleton />}>
        <ListingResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
```

The mechanism is Next 16's Cache Components (`cacheComponents: true` in `next.config.ts`), which is where Partial Prerendering landed after the `experimental.ppr` flag. Instead of marking routes as PPR-enabled, you mark the data functions with `"use cache"` and give them a cache profile. Anything not covered by a cache boundary is dynamic and streams in.

The Funda client declares three profiles in `next.config.ts`:

- `fundaListings`: revalidate every 5 minutes. The overview changes often enough that stale data is noticeable.
- `fundaDetail`: revalidate every 30 minutes, expire after a day. A single listing barely changes once published.
- `fundaMissing`: revalidate every minute. A listing that 404s may just be lagging behind in the feed, so I did not want to cache that miss for long.

The trade-off worth discussing: the shell paints immediately and the cache absorbs most of the upstream latency, but a cache miss on a cold page still means the user watches a skeleton while Next waits on the Funda API. Tuning those windows is guesswork without real traffic numbers.

## Data layer

`src/lib/funda/` is the only place that talks to the Funda API. It is marked `import "server-only"` so it cannot leak into a client bundle.

The flow is fetch, validate with Zod, map to domain types, render. The mapping step matters: the Funda feed returns Dutch PascalCase keys, inconsistent nullability and HTML in description fields, and I did not want that shape spreading through the components. Everything above `mappers.ts` works with plain domain objects.

## Components

- `components/ui/` holds generic primitives (Button, Dialog, Carousel, Pagination, Skeleton). No domain knowledge.
- `components/features/` holds domain UI, split into `listings/`, `detail/` and `gallery/`.
- `components/layout/` holds the header and footer.

Components live in `ComponentName/ComponentName.tsx` with their story and tests co-located. There are no barrel files, so every import points at the file it actually uses and the bundler does not have to work it out.

Almost everything is a server component. Interactive leaves use a `.client.tsx` suffix, which makes the server/client boundary visible in the file tree instead of hidden behind a `"use client"` on line one. The two heavy client bundles, the gallery dialog and the map, load through `next/dynamic`. The map additionally waits for an IntersectionObserver hit 400px before the viewport, so a visitor who never scrolls down never downloads Leaflet.

## Package choices

`zod` for validating the API responses. I have more mileage with Yup, but Zod has become the default in the TypeScript ecosystem and its inference is better, so it was the sensible pick over the one I know best.

`embla-carousel-react` for the gallery lightbox. I have used it on previous projects and it has been a good experience: small, unopinionated about styling, and it exposes an API you can drive from your own state instead of fighting it.

`react-leaflet` with OpenStreetMap tiles. It is the recommended React binding for Leaflet and OSM needs no API key, which keeps the project runnable by anyone who clones it.

`@phosphor-icons/react` is a personal preference. The icon set is consistent, the weights are useful, and it tree-shakes well with `optimizePackageImports`.

`@radix-ui/react-dialog` under `ui/Dialog`, for focus trapping and the accessibility behaviour I did not want to reimplement.

`oxlint` and `oxfmt` instead of ESLint and Prettier. I have been following the Oxc project for a while and the speed difference is hard to overstate: linting this repo finishes faster than ESLint takes to load its config. The rule coverage is not at ESLint parity yet, and `oxlint-tsgolint` for type-aware rules is still young, but for a project this size the trade is easy.

## Testing

Two Vitest projects. Unit tests run in Node and cover the parts with real logic: the API client, the mappers, the HTML stripping, the formatters and the featured-listing placement. Storybook tests run in a real Chromium through Playwright.

I deliberately did not write a separate end-to-end suite. For behaviour that is really about what a component does on screen, a Storybook play function is the better home: the story is the fixture, the test and the documentation at once, and it runs against the same rendered component a reviewer looks at. The gallery stories, for example, assert that opening a photo from the grid lands on the right slide and that focus returns to the tile that opened it. That is the kind of thing that usually rots in an E2E suite and stays honest in a story.

Storybook's a11y addon runs with `test: "error"`, so an accessibility violation fails the test run rather than showing up as a warning nobody reads.

## Scope

I spent around nine hours on this, which is what shaped the choices below.

The assessment covers buying only. The Huren, Verkopen and Nieuwbouw items in the header are rendered as disabled on purpose, to show where they would live without implying they work. There is no search or filtering, so the overview shows the full feed, paginated.

## What I would do next

The map is the weakest part. It works and it lazy-loads, but the marker, popup and styling are close to Leaflet defaults, and I have not looked at what happens on slow connections or at the interaction between the tile layer and the page's own scroll behaviour.

The gallery state management would be my second pass. It works and the focus handling is correct, but the context carries a fair amount of state (`open`, `view`, `index`, `photos`, plus focus restoration) and a reducer with explicit transitions would express the overview/lightbox split better than the current set of independent setters. This was not the focus of the project and it shows.

Beyond that: more measurement of page load and rendering, real numbers instead of reasoning about them, and more time in the seam between server and client in a meta framework. That boundary is where the interesting decisions in this stack are, and a two-page app only exercises a small part of it.

## On AI tooling

I used AI throughout this project and want to be direct about how.

Early on I used v0 to explore UI directions quickly, before committing to a layout. Once the direction was clear I rebuilt it in a clean codebase and made every architectural and code decision myself, with maintainability and structure as the goal rather than getting something on screen fast.

During implementation I used AI to brainstorm approaches and to move faster on the mechanical parts. Every architectural decision, every package choice and all of the final code has been reviewed by me, and I can explain the reasoning behind any of it.
