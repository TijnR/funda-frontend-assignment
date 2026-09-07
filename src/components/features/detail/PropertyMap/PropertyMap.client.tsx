"use client";

import { useLayoutEffect, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export function PropertyMap({
  address,
  latitude,
  longitude,
}: {
  address: string;
  latitude: number;
  longitude: number;
}) {
  const position: [number, number] = [latitude, longitude];

  // Cache Components keeps a visited route mounted with React Activity: the DOM survives while
  // the effects are torn down. React Leaflet cannot come back from that, because on re-activation
  // its ref callback sees the container it already initialised and skips creating a map, while its
  // children re-attach to the map instance Leaflet removed on the way out. Bumping the key while
  // the route is hidden throws that subtree away, so returning to the route renders a fresh
  // container that Leaflet initialises from scratch.
  const [mapInstance, setMapInstance] = useState(0);

  useLayoutEffect(() => {
    return () => setMapInstance((current) => current + 1);
  }, []);

  return (
    <section
      aria-label={`Kaart van ${address}`}
      className="overflow-hidden rounded-card border border-border shadow-card"
    >
      <MapContainer
        key={mapInstance}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-80 w-full sm:h-112"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-bijdragers</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={position}
          radius={12}
          pathOptions={{
            color: "var(--secondary-foreground)",
            fillColor: "var(--secondary)",
            fillOpacity: 1,
            weight: 3,
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            {address}
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </section>
  );
}
