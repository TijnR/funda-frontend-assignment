import { buttonVariants } from "@/components/ui/Button/Button";
import { Separator } from "@/components/ui/Separator/Separator";

import { LazyPropertyMap } from "../PropertyMap/LazyPropertyMap.client";

export function LocationSection({
  address,
  city,
  latitude,
  longitude,
}: {
  address: string;
  city: string;
  latitude: number;
  longitude: number;
}) {
  const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  return (
    <section>
      <Separator />
      <div className="mt-10 mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold">Locatie</h2>
          <p className="mt-1 text-muted-foreground">
            {address}, {city}
          </p>
        </div>
        <a
          href={openStreetMapUrl}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Open in OpenStreetMap
        </a>
      </div>
      <LazyPropertyMap address={address} latitude={latitude} longitude={longitude} />
    </section>
  );
}
