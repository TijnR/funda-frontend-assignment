import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button/Button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/Pagination/Pagination";
import { cn } from "@/utils/cn";

const disabledClass = "cursor-not-allowed text-muted-foreground";

export function ResultsPagination({ page, pageCount }: { page: number; pageCount: number }) {
  if (pageCount <= 1) return null;

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          {page > 1 ? (
            // Page 2 links back to `/`, not `/?page=1`, so the first page has one URL.
            <Link
              href={page === 2 ? "/" : `/?page=${page - 1}`}
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              aria-label="Ga naar de vorige resultatenpagina"
            >
              <ArrowLeftIcon className="size-4" weight="bold" aria-hidden="true" />
              <span className="hidden sm:inline">Vorige</span>
            </Link>
          ) : (
            <span
              className={cn(buttonVariants({ variant: "outline" }), disabledClass)}
              aria-hidden="true"
            >
              <ArrowLeftIcon className="size-4" weight="bold" />
              <span className="hidden sm:inline">Vorige</span>
            </span>
          )}
        </PaginationItem>
        <PaginationItem>
          <span className="px-3 text-sm font-medium" aria-current="page">
            Pagina {page} van {pageCount.toLocaleString("nl-NL")}
          </span>
        </PaginationItem>
        <PaginationItem>
          {page < pageCount ? (
            <Link
              href={`/?page=${page + 1}`}
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              aria-label="Ga naar de volgende resultatenpagina"
            >
              <span className="hidden sm:inline">Volgende</span>
              <ArrowRightIcon className="size-4" weight="bold" aria-hidden="true" />
            </Link>
          ) : (
            <span
              className={cn(buttonVariants({ variant: "outline" }), disabledClass)}
              aria-hidden="true"
            >
              <span className="hidden sm:inline">Volgende</span>
              <ArrowRightIcon className="size-4" weight="bold" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
