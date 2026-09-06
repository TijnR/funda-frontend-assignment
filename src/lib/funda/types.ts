export interface PropertyImage {
  url: string;
  width: number;
  height: number;
  description?: string;
}

export interface PropertyFeature {
  label: string;
  value: string;
}

export interface PropertyFeatureGroup {
  title: string;
  features: PropertyFeature[];
}

export interface ListingSummary {
  id: string;
  address: string;
  city: string;
  postcode: string;
  price: number | null;
  livingArea: number | null;
  rooms: number | null;
  plotArea: number | null;
  image: PropertyImage | null;
}

export interface ListingDetail extends ListingSummary {
  description: string | null;
  buildYear: string | null;
  bedrooms: number | null;
  energyLabel: string | null;
  brokerName: string | null;
  fundaUrl: string | null;
  featureGroups: PropertyFeatureGroup[];
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  photos: PropertyImage[];
}

export interface PaginatedListings {
  items: ListingSummary[];
  page: number;
  pageCount: number;
  total: number;
}
