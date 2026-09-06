"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { createContext, useContext, useEffect } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type CarouselApi = UseEmblaCarouselType[1];

interface CarouselContextValue {
  viewportRef: UseEmblaCarouselType[0];
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel components must be used inside Carousel.");
  return context;
}

export function Carousel({
  children,
  className,
  opts,
  setApi,
  ...props
}: ComponentProps<"section"> & {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  setApi?: (api: CarouselApi) => void;
}) {
  const [viewportRef, emblaApi] = useEmblaCarousel(opts);

  useEffect(() => {
    setApi?.(emblaApi);
  }, [emblaApi, setApi]);

  return (
    <CarouselContext.Provider value={{ viewportRef }}>
      <section className={cn("relative", className)} aria-roledescription="carrousel" {...props}>
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, ...props }: ComponentProps<"div">) {
  const { viewportRef } = useCarousel();

  return (
    <div ref={viewportRef} className="overflow-hidden">
      <div className={cn("flex touch-pan-y", className)} {...props} />
    </div>
  );
}

export function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="group"
      aria-roledescription="dia"
      {...props}
    />
  );
}
