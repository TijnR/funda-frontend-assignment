import { NotFoundState } from "@/components/features/detail/NotFoundState/NotFoundState";
import { PAGE_SHELL_CLASS } from "@/styles/shared";
import { cn } from "@/utils/cn";

export default function ListingNotFound() {
  return (
    <main id="main-content" tabIndex={-1} className={cn(PAGE_SHELL_CLASS, "grow py-16")}>
      <NotFoundState />
    </main>
  );
}
