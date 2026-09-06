"use client";

import { useGallery } from "@/context/GalleryContext";

export function GalleryCounter() {
  const { index, photos } = useGallery();

  return (
    <p
      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-white tabular-nums backdrop-blur-md"
      aria-live="polite"
      aria-atomic="true"
    >
      {index + 1} / {photos.length}
    </p>
  );
}
