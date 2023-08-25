import { PhotoType } from "../post";

export interface Apartment {
  id: string;
  geometry: Geometry;
  type: ApartmentType;
  category: Category;
  apartmentPrice: number;
  rentPrice: number;
  icon: string;
  address?: string;
  rating?: number;
  name?: string;
  title: string;
  description: string;
  square_meter: number;
  bedRooms: number;
  bathrooms: number;
  photos: ApartmentPhoto[] | string[];
  placeId: string;
  views: number;
  reference: string;
  vicinity: string;
  author: Author;
}
export interface Facility {
  id: number;
  name: string;
}

export interface NewApartment {
  geometry: Geometry;
  category: Category | null;
  price: string;
  address: string;
  title: string;
  description: string;
  squareMeter: string;
  bedrooms: number;
  bathrooms: number;
  photos: ApartmentPhoto[];
  authorId: string;
  facilities?: Facility[] | null;
  totalRooms: number;
}
export interface Geometry {
  location: Location;
  // viewport: Viewport;
}

export interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
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
  id: number;
  name: string;
}

export interface ApartmentPhoto {
  key?: any;
  height?: number;
  htmlAttributions?: any[];
  photoUrl: string;
  width?: number;
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
