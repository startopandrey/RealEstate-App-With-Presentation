export interface Apartment {
  id: string;
  geometry: Geometry;
  type: ApartmentType;
  category: Category;
  apartmentPrice: number;
  rentPrice: number;
  icon: string;
  isOpenNow?: boolean;
  isClosedTemporarily?: boolean;
  address?: number;
  rating?: number;
  name?: string;
  title: string;
  description: string;
  square_meter: number;
  bedRooms: number;
  bathrooms: number;
  photos: Photo[] | string[];
  placeId: string;
  views: number;
  reference: string;
  vicinity: string;
  author: Author;
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

export interface ApartmentType {
  id: string;
  name: "For Sale" | "For Rent";
}

export interface Category {
  id: string;
  name: string;
}

export interface Photo {
  height: number;
  htmlAttributions: any[];
  photo_url: string;
  width: number;
}

export interface Author {
  id: string;
  avatarImage: string;
  fullName: string;
  type: Type2;
  phone: number;
  description: string;
}

export interface Type2 {
  id: number;
  name: string;
}
export type ApartmentStackNavigatorParamList = {
  Apartments: undefined;
  ApartmentDetail: undefined;
  ApartmentGallery: undefined;
};
