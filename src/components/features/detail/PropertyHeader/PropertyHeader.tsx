import { formatPrice } from "@/utils/format";

export function PropertyHeader({
  address,
  city,
  postcode,
  price,
}: {
  address: string;
  city: string;
  postcode: string;
  price: number | null;
}) {
  const location = [postcode, city].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{address}</h1>
        {!!location && <p className="mt-2 text-lg text-muted-foreground">{location}</p>}
      </div>
      <p className="shrink-0 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        {formatPrice(price)}
      </p>
    </div>
  );
}
