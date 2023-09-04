import { initialRegion } from "./src/utils/constants";
import { ApartmentFeature, NewApartment } from "./src/types/apartments/apartment";

export const featuresListMock: ApartmentFeature[] = [
  { type: "bedroom", quantity: 1 },
  { type: "bathroom", quantity: 1 },
  { type: "balcony", quantity: 1 },
];
export const apartmentCategories = [
  { id: 1, name: "House" },
  { id: 2, name: "Apartment" },
  { id: 3, name: "Hotel" },
  { id: 4, name: "Villa" },
  { id: 5, name: "Cottage" },
];
export const facilitiesList = [
  { id: 1, name: "Parking Lot" },
  { id: 2, name: "Pet Allowed" },
  { id: 3, name: "Garden" },
  { id: 4, name: "Gym" },
  { id: 5, name: "Park" },
  { id: 6, name: "Home theatre" },
  { id: 7, name: "Kid’s Friendly" },
  { id: 8, name: "Pool" },
];
export const initialNewApartment: NewApartment = {
  title: "",
  description: "",
  category: null,
  squareMeter: "",
  location: initialRegion,
  features: featuresListMock,
  price: "",
  address: "Property Address",
  totalRooms: 1,
  facilities: [],
  photos: [],
  authorId: "authorID",
};
