import type {
  ListingDetail,
  ListingSummary,
  PropertyFeatureGroup,
  PropertyImage,
} from "@/lib/funda/types";

export const propertyPhotos: PropertyImage[] = [
  {
    url: "https://cloud.funda.nl/valentina_media/227/572/214_grotere.jpg?photo=1",
    width: 922,
    height: 615,
  },
  {
    url: "https://cloud.funda.nl/valentina_media/227/572/214_grotere.jpg?photo=2",
    width: 922,
    height: 615,
  },
  {
    url: "https://cloud.funda.nl/valentina_media/227/572/214_grotere.jpg?photo=3",
    width: 922,
    height: 615,
  },
];

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

export const propertyFeatureGroups: PropertyFeatureGroup[] = [
  {
    title: "Overdracht",
    features: [
      { label: "Vraagprijs", value: "€ 875.000 kosten koper" },
      { label: "Aangeboden sinds", value: "3 weken" },
      { label: "Status", value: "Beschikbaar" },
      { label: "Aanvaarding", value: "In overleg" },
    ],
  },
  {
    title: "Bouw",
    features: [
      { label: "Soort woonhuis", value: "Grachtenpand, tussenwoning" },
      { label: "Bouwvorm", value: "Bestaande bouw" },
      { label: "Bouwjaar", value: "1890" },
      { label: "Soort dak", value: "Zadeldak bedekt met dakpannen" },
    ],
  },
  {
    title: "Oppervlakten en inhoud",
    features: [
      { label: "Wonen (= woonoppervlakte)", value: "128 m²" },
      { label: "Perceeloppervlakte", value: "156 m²" },
      { label: "Inhoud", value: "430 m³" },
    ],
  },
  {
    title: "Energie",
    features: [
      { label: "Energielabel", value: "B" },
      { label: "Isolatie", value: "Dakisolatie, HR-glas en vloerisolatie" },
      { label: "Verwarming", value: "C.V.-ketel" },
    ],
  },
];

export const listingDetailFixture: ListingDetail = {
  ...listingFixture,
  image: propertyPhotos[0] ?? null,
  description: "Een lichte woning aan de gracht met een rustige achtertuin.",
  buildYear: "1890",
  bedrooms: 3,
  energyLabel: "B",
  brokerName: "Voorbeeld Makelaars",
  fundaUrl: "https://www.funda.nl/koop/amsterdam/huis-89234567-keizersgracht-241-a/",
  featureGroups: propertyFeatureGroups,
  coordinates: { latitude: 52.3752, longitude: 4.8839 },
  photos: propertyPhotos,
};
