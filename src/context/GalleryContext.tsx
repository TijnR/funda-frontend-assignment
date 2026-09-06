"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import type { PropertyImage } from "@/lib/funda/types";

export type GalleryView = "overview" | "lightbox";

interface GalleryContextValue {
  index: number;
  label: string;
  open: boolean;
  photos: PropertyImage[];
  view: GalleryView;
  openOverview: (trigger: HTMLElement) => void;
  openPhoto: (index: number, trigger: HTMLElement) => void;
  restoreFocus: () => void;
  setIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
  showOverview: () => void;
  showPhoto: (index: number) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error("Gallery components must be rendered inside GalleryProvider.");
  return context;
}

export function GalleryProvider({
  children,
  label,
  photos,
  initiallyOpen = false,
}: {
  children: ReactNode;
  label: string;
  photos: PropertyImage[];
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const [view, setView] = useState<GalleryView>("overview");
  const [index, setIndex] = useState(0);
  const openerRef = useRef<HTMLElement | null>(null);

  const restoreFocus = useCallback(() => openerRef.current?.focus(), []);

  const openOverview = useCallback((trigger: HTMLElement) => {
    openerRef.current = trigger;
    setView("overview");
    setOpen(true);
  }, []);

  const openPhoto = useCallback((nextIndex: number, trigger: HTMLElement) => {
    openerRef.current = trigger;
    setIndex(nextIndex);
    setView("lightbox");
    setOpen(true);
  }, []);

  const showPhoto = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
    setView("lightbox");
  }, []);

  const showOverview = useCallback(() => setView("overview"), []);

  const value = useMemo<GalleryContextValue>(
    () => ({
      index,
      label,
      open,
      photos,
      view,
      openOverview,
      openPhoto,
      restoreFocus,
      setIndex,
      setOpen,
      showOverview,
      showPhoto,
    }),
    [
      index,
      label,
      open,
      photos,
      view,
      openOverview,
      openPhoto,
      restoreFocus,
      showOverview,
      showPhoto,
    ],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}
