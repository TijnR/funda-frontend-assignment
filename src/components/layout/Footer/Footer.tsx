import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "inline-flex items-center gap-1.5 rounded-card text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-chrome">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Image
              src="/funda-tijn-logo.svg"
              alt="Funda - Tijn Roozen"
              width={249}
              height={36}
              unoptimized
              className="h-7 w-auto"
            />
            <p className="mt-4 text-sm/6 text-muted-foreground">
              Deze footer is heel inspiratievol.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 sm:items-end">
            <Link href="/" className={linkClass}>
              Alle koopwoningen
            </Link>
            <a href="https://www.funda.nl" target="_blank" rel="noreferrer" className={linkClass}>
              funda.nl
              <ArrowSquareOutIcon className="size-3.5" weight="bold" aria-hidden="true" />
              <span className="sr-only">(opent in een nieuw tabblad)</span>
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Front-end assignment - Tijn Roozen</p>
          <p>Woningdata via de Funda Partner API</p>
        </div>
      </div>
    </footer>
  );
}
