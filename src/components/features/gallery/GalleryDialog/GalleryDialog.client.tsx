"use client";

import { Dialog, DialogContent } from "@/components/ui/Dialog/Dialog";
import { useGallery } from "@/context/GalleryContext";

import { GalleryLightbox } from "../GalleryLightbox/GalleryLightbox.client";
import { GalleryOverview } from "../GalleryOverview/GalleryOverview.client";

export function GalleryDialog() {
  const { open, photos, restoreFocus, setOpen, view } = useGallery();

  if (!photos.length) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          restoreFocus();
        }}
        className="inset-0 top-0 left-0 h-dvh w-screen max-w-none translate-0 overflow-hidden rounded-none border-0 p-0 shadow-none sm:p-0"
      >
        {view === "overview" && <GalleryOverview />}
        {view === "lightbox" && <GalleryLightbox />}
      </DialogContent>
    </Dialog>
  );
}
