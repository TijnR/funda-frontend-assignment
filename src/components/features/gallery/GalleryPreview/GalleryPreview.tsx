import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import { ImagesIcon } from "@phosphor-icons/react/dist/ssr/Images";
import Image from "next/image";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import type { PropertyImage } from "@/lib/funda/types";
import { cn } from "@/utils/cn";

import { describeImage } from "../describeImage";
import { GalleryTrigger } from "../GalleryTrigger/GalleryTrigger.client";

const MAX_TILES = 5;

export function GalleryPreview({ label, photos }: { label: string; photos: PropertyImage[] }) {
  const visiblePhotos = photos.slice(0, MAX_TILES);
  const photoCount = visiblePhotos.length;
  const [leadPhoto, ...secondaryPhotos] = visiblePhotos;
  const hasMore = photos.length > 1;

  if (!leadPhoto) {
    return (
      <div className="aspect-4/3 overflow-hidden rounded-card sm:aspect-16/8">
        <ImagePlaceholder icon={HouseIcon} />
      </div>
    );
  }

  return (
    <div className="grid gap-2 sm:h-128 sm:grid-cols-4 sm:grid-rows-2">
      <GalleryTrigger
        index={0}
        opens={hasMore ? "overview" : "photo"}
        className={cn(
          "aspect-4/3 sm:col-span-2 sm:row-span-2 sm:aspect-auto",
          photoCount === 1 && "sm:col-span-4",
        )}
      >
        <Image
          src={leadPhoto.url}
          alt={`${label}, ${describeImage(leadPhoto, 0)}`}
          fill
          sizes={
            photoCount === 1
              ? "(max-width: 639px) 100vw, (max-width: 1200px) 100vw, 1120px"
              : "(max-width: 639px) 100vw, (max-width: 1200px) 50vw, 560px"
          }
          preload
          fetchPriority="high"
          className="object-cover transition duration-300 hover:scale-102 motion-reduce:transform-none"
        />
        {hasMore && (
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-sm font-semibold text-white sm:hidden">
            <ImagesIcon className="size-4" weight="bold" aria-hidden="true" />
            Alle {photos.length} foto&apos;s
          </span>
        )}
      </GalleryTrigger>

      <div className="hidden sm:contents">
        {secondaryPhotos.map((photo, secondaryIndex) => {
          const index = secondaryIndex + 1;
          const isLastVisible = index === photoCount - 1 && photos.length > photoCount;

          return (
            <GalleryTrigger
              key={photo.url}
              index={index}
              opens={isLastVisible ? "overview" : "photo"}
              className={cn(
                photoCount === 2 && "sm:col-span-2 sm:row-span-2",
                photoCount === 3 && "sm:col-span-2",
                photoCount === 4 && index === 1 && "sm:col-span-2",
              )}
            >
              <Image
                src={photo.url}
                alt={`${label}, ${describeImage(photo, index)}`}
                fill
                sizes="(max-width: 1200px) 25vw, 280px"
                fetchPriority="low"
                className="object-cover transition duration-300 hover:scale-102 motion-reduce:transform-none"
              />
              {isLastVisible && (
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/55 font-semibold text-white">
                  <ImagesIcon className="size-5" weight="bold" aria-hidden="true" />
                  Alle {photos.length} foto&apos;s
                </span>
              )}
            </GalleryTrigger>
          );
        })}
      </div>
    </div>
  );
}
