"use client";

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

  return (
    <section
      aria-label={`Kaart van ${address}`}
      className="overflow-hidden rounded-card border border-border shadow-card"
    >
      <MapContainer
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
