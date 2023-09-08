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
export interface ApartmentFeature {
  id: string;
  type: "bedroom" | "bathroom" | "balcony";
  quantity: number;
}
export interface NewApartment {
  _id: string;
  location: Location;
  category: ApartmentCategory;
  price: string;
  address: string;
  title: string;
  description: string;
  squareMeter: string;
  photos: ApartmentPhoto[];
  authorId: string;
  features: ApartmentFeature[];
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

export interface ApartmentCategory {
  id: number;
  name: string;
}

export interface ApartmentPhoto {
  key?: any;
  height?: number;
  url?: string;
  htmlAttributions?: any[];
  photoUrl: string;
  name?: string;
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
