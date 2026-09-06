"use client";

import { XIcon } from "@phosphor-icons/react/dist/csr/X";

import { Button } from "@/components/ui/Button/Button";
import { DialogClose, DialogDescription, DialogTitle } from "@/components/ui/Dialog/Dialog";
import { useGallery } from "@/context/GalleryContext";

import { GalleryGrid } from "../GalleryGrid/GalleryGrid.client";

export function GalleryOverview() {
  const { label, photos } = useGallery();

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <header className="flex shrink-0 items-center gap-3 border-b bg-background/95 p-3 backdrop-blur-sm sm:px-5">
        <DialogClose asChild>
          <Button type="button" variant="ghost" size="icon" aria-label="Galerij sluiten">
            <XIcon className="size-5" weight="bold" aria-hidden="true" />
          </Button>
        </DialogClose>
        <div className="min-w-0 flex-1">
          <DialogTitle className="truncate font-heading text-base font-bold tracking-tight sm:text-lg">
            {label}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {photos.length} {photos.length === 1 ? "foto" : "foto's"}
          </DialogDescription>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-5 sm:py-6">
          <GalleryGrid />
        </div>
      </div>
    </div>
  );
}
