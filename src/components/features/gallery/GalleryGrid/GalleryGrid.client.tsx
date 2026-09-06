"use client";

import Image from "next/image";

import { useGallery } from "@/context/GalleryContext";

import { describeImage } from "../describeImage";

export function GalleryGrid() {
  const { label, photos, showPhoto } = useGallery();

  return (
    <div className="columns-2 gap-2 sm:columns-3 sm:gap-3">
      {photos.map((photo, index) => (
        <button
          key={photo.url}
          type="button"
          onClick={() => showPhoto(index)}
          className="mb-2 block w-full break-inside-avoid overflow-hidden rounded-card bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:mb-3"
          aria-label={`Open ${describeImage(photo, index).toLowerCase()}`}
        >
          <Image
            src={photo.url}
            alt={`${label}, ${describeImage(photo, index).toLowerCase()}`}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 639px) 50vw, 33vw"
            className="h-auto w-full transition duration-200 hover:opacity-90"
          />
        </button>
      ))}
    </div>
  );
}
