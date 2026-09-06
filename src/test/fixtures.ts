import type { ListingSummary } from "@/lib/funda/types";

/** A complete, well-formed listing. Stories derive their variants from this. */
export const listingFixture: ListingSummary = {
  id: "89234567",
  address: "Keizersgracht 241 A",
  city: "Amsterdam",
  postcode: "1016 EA",
  price: 875000,
  livingArea: 128,
  rooms: 4,
  plotArea: 156,
  image: {
    url: "https://cloud.funda.nl/valentina_media/227/572/214_grotere.jpg",
    width: 922,
    height: 615,
    description: "Voorgevel van een grachtenpand",
  },
};
