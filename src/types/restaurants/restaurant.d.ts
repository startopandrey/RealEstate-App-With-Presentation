export interface Root {
  htmlAttributions: any[];
  nextPageToken: string;
  results: Result[];
  status: string;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface OpeningHours {
  openNow: boolean;
}

export interface Photo {
  height: number;
  htmlAttributions: string[];
  photoReference: string;
  width: number;
}

export interface PlusCode {
  compoundCode: string;
  globalCode: string;
}
export interface Restaurant {
  businessStatus?: string;
  geometry: Geometry;
  icon: string;
  name: string;
  openingHours?: OpeningHours;
  photos: Photo[];
  placeId: string;
  rating?: number;
  reference: string;
  userRatingsTotal?: number;
  vicinity: string;
  plusCode?: PlusCode;
  scope?: string;
  types?: string[];
  priceLevel?: number;
  address?: number;
  isOpenNow?: boolean;
  isClosedTemporarily?: boolean;
  price?: 12.99
}
