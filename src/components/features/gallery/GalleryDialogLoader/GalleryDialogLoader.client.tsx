"use client";

import dynamic from "next/dynamic";

const GalleryDialog = dynamic(
  () => import("../GalleryDialog/GalleryDialog.client").then((module) => module.GalleryDialog),
  { ssr: false },
);

export function GalleryDialogLoader() {
  return <GalleryDialog />;
}
