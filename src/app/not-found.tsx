import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button/Button";
import { PAGE_SHELL_CLASS } from "@/styles/shared";
import { cn } from "@/utils/cn";

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(PAGE_SHELL_CLASS, "grow content-center py-16 text-center")}
    >
      <p className="font-heading text-sm font-bold tracking-widest text-primary">404</p>
      <h1 className="mt-3 font-heading text-3xl font-bold">Pagina niet gevonden</h1>
      <p className="mt-4 text-muted-foreground">
        De pagina die je zoekt bestaat niet of is verplaatst.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-8")}>
        Terug naar het woningaanbod
      </Link>
    </main>
  );
}
