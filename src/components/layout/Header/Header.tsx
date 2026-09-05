import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Kopen", href: "/", active: true },
  { label: "Huren", active: false },
  { label: "Verkopen", active: false },
  { label: "Nieuwbouw", active: false },
] as const;

export function Header() {
  return (
    <header className="bg-primary shadow-header">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-8 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Naar het woningoverzicht"
          className="inline-flex items-center gap-2 rounded-card focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
        >
          <Image
            src="/funda-tijn-logo.svg"
            alt="Funda - Tijn Roozen"
            width={249}
            height={36}
            priority
            unoptimized
            className="h-8 w-auto shrink-0 md:h-9"
          />
        </Link>

        <nav aria-label="Hoofdnavigatie" className="hidden sm:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) =>
              item.active ? (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="rounded-card text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label}>
                  <span
                    aria-disabled="true"
                    title="Deze pagina bestaat nog niet"
                    className="cursor-not-allowed text-sm font-semibold text-primary-foreground/70"
                  >
                    {item.label}
                  </span>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
