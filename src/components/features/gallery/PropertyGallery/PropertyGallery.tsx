import { GalleryProvider } from "@/context/GalleryContext";
import type { PropertyImage } from "@/lib/funda/types";

import { GalleryDialogLoader } from "../GalleryDialogLoader/GalleryDialogLoader.client";
import { GalleryPreview } from "../GalleryPreview/GalleryPreview";

export function PropertyGallery({
  photos,
  label,
  initiallyOpen = false,
}: {
  photos: PropertyImage[];
  label: string;
  initiallyOpen?: boolean;
}) {
  return (
    <GalleryProvider photos={photos} label={label} initiallyOpen={initiallyOpen}>
      <GalleryPreview photos={photos} label={label} />
      <GalleryDialogLoader />
    </GalleryProvider>
  );
}
