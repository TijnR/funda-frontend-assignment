"use client";

import dynamic from "next/dynamic";

import { MapPlaceholder } from "@/components/ui/MapPlaceholder/MapPlaceholder";
import { useInView } from "@/hooks/useInView";

const PropertyMap = dynamic(
  () => import("./PropertyMap.client").then((module) => module.PropertyMap),
  { ssr: false },
);

export function LazyPropertyMap({
  address,
  latitude,
  longitude,
}: {
  address: string;
  latitude: number;
  longitude: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("400px");

  return (
    <div ref={ref}>
      {inView && <PropertyMap address={address} latitude={latitude} longitude={longitude} />}
      {!inView && <MapPlaceholder />}
    </div>
  );
}
