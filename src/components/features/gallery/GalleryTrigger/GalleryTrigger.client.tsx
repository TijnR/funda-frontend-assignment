"use client";

import type { ReactNode } from "react";

import { useGallery } from "@/context/GalleryContext";
import { cn } from "@/utils/cn";

import { describeImage } from "../describeImage";

export function GalleryTrigger({
  children,
  className,
  index,
  opens = "photo",
}: {
  children: ReactNode;
  className?: string;
  index: number;
  opens?: "photo" | "overview";
}) {
  const { openOverview, openPhoto, photos } = useGallery();
  const photo = photos[index];

  const openGallery = (trigger: HTMLElement) => {
    if (opens === "overview") openOverview(trigger);
    else openPhoto(index, trigger);
  };

  return (
    <button
      type="button"
      className={cn(
        "relative block overflow-hidden rounded-card bg-muted text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
      onClick={(event) => openGallery(event.currentTarget)}
      aria-label={
        opens === "overview"
          ? `Bekijk alle ${photos.length} foto's`
          : `Open ${photo ? describeImage(photo, index).toLowerCase() : `foto ${index + 1}`}`
      }
    >
      {children}
    </button>
  );
}
