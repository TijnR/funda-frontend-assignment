"use client";

import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/csr/SquaresFour";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button/Button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel/Carousel";
import { DialogDescription, DialogTitle } from "@/components/ui/Dialog/Dialog";
import { useGallery } from "@/context/GalleryContext";
import { cn } from "@/utils/cn";

import { describeImage } from "../describeImage";
import { GalleryCounter } from "../GalleryCounter/GalleryCounter.client";

const CONTROL_CLASS =
  "rounded-full bg-black/45 text-white hover:bg-black/65 hover:text-white focus-visible:ring-white focus-visible:ring-offset-black";

export function GalleryLightbox() {
  const { index, label, photos, setIndex, setOpen, showOverview } = useGallery();
  const [startIndex] = useState(index);
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!emblaApi) return undefined;
    const syncSelection = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", syncSelection);
    return () => {
      emblaApi.off("select", syncSelection);
    };
  }, [emblaApi, setIndex]);

  useEffect(() => {
    if (!emblaApi) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") emblaApi.scrollNext();
      if (event.key === "ArrowLeft") emblaApi.scrollPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi]);

  return (
    <div className="relative flex h-full flex-col bg-black text-white">
      <DialogTitle className="sr-only">Fotogalerij van {label}</DialogTitle>
      <DialogDescription className="sr-only">
        Gebruik de pijltoetsen of veeg om door de woningfoto&apos;s te gaan.
      </DialogDescription>

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 bg-linear-to-b from-black/70 to-transparent px-3 pt-3 pb-8 sm:px-5 sm:pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={showOverview}
          aria-label="Alle foto's bekijken"
          className={cn(CONTROL_CLASS, "h-11 px-3")}
        >
          <SquaresFourIcon className="size-5" weight="bold" aria-hidden="true" />
          <span className="hidden sm:inline">Alle foto&apos;s</span>
        </Button>
        <GalleryCounter />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          aria-label="Galerij sluiten"
          className={CONTROL_CLASS}
        >
          <XIcon className="size-5" weight="bold" aria-hidden="true" />
        </Button>
      </div>

      <Carousel
        opts={{ loop: photos.length > 1, startIndex }}
        setApi={setEmblaApi}
        className="min-h-0 flex-1"
        aria-label={`Foto's van ${label}`}
      >
        <CarouselContent className="h-dvh">
          {photos.map((photo, photoIndex) => (
            <CarouselItem
              key={photo.url}
              aria-label={`${photoIndex + 1} van ${photos.length}`}
              aria-hidden={photoIndex !== index}
              inert={photoIndex !== index}
              className="h-full px-2 pt-16 pb-6 sm:px-20 sm:pt-20 sm:pb-8"
            >
              <div className="relative size-full">
                <Image
                  src={photo.url}
                  alt={`${label}, ${describeImage(photo, photoIndex).toLowerCase()}`}
                  fill
                  sizes="100vw"
                  loading={Math.abs(photoIndex - index) <= 1 ? "eager" : "lazy"}
                  fetchPriority={photoIndex === index ? "high" : "low"}
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {photos.length > 1 && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Vorige foto"
            className={cn(CONTROL_CLASS, "absolute top-1/2 left-3 z-10 -translate-y-1/2")}
          >
            <CaretLeftIcon className="size-6" weight="bold" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Volgende foto"
            className={cn(CONTROL_CLASS, "absolute top-1/2 right-3 z-10 -translate-y-1/2")}
          >
            <CaretRightIcon className="size-6" weight="bold" aria-hidden="true" />
          </Button>
        </>
      )}
    </div>
  );
}
