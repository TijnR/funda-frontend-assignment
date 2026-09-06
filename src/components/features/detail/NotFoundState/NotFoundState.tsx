import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button/Button";
import { StatusPanel } from "@/components/ui/StatusPanel/StatusPanel";
import { cn } from "@/utils/cn";

export function NotFoundState() {
  return (
    <StatusPanel
      className="mx-auto max-w-xl"
      headingLevel={1}
      icon={HouseIcon}
      title="Deze woning is niet meer beschikbaar"
      description="De advertentie is verwijderd of de link klopt niet meer."
      action={
        <Link href="/" className={cn(buttonVariants(), "mt-6")}>
          Bekijk het actuele aanbod
        </Link>
      }
    />
  );
}
