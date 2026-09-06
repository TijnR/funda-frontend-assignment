export interface PropertyImage {
  url: string;
  width: number;
  height: number;
  /** Alt text from Funda. Not every listing has one. */
  description?: string;
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

export interface PaginatedListings {
  items: ListingSummary[];
  page: number;
  pageCount: number;
  total: number;
}
