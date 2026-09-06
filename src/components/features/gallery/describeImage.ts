import type { PropertyImage } from "@/lib/funda/types";

export function describeImage(photo: PropertyImage, index: number): string {
  const position = `Foto ${index + 1}`;
  return photo.description?.trim() ? `${position}: ${photo.description.trim()}` : position;
}
