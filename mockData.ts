import { initialRegion } from "./src/utils/constants";
import {
  ApartmentFeature,
  NewApartment,
} from "./src/types/apartments/apartment";

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
export const initialOnboardingBlocks = [
  {
    titleArray: [
      { text: "Find best place to stay in", fontWeight: "normal" },
      { text: "good price", fontWeight: "bold" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
    photoUrl:
      "https://www.thenordroom.com/wp-content/uploads/2022/03/small-dark-blue-living-room-bay-window-fireplace-built-in-bookshelves-nordroom-1500x1000.jpg",
    isSelected: true,
  },
  {
    isSelected: false,
    titleArray: [
      { text: "Fast sell your property in just", fontWeight: "normal" },
      { text: "one click", fontWeight: "bold" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
    photoUrl:
      "https://decoholic.org/wp-content/uploads/2020/02/cozy-attic-living-room-720x900.jpg",
  },
  {
    isSelected: false,
    titleArray: [
      { text: "Find", fontWeight: "normal" },
      { text: "perfect choice ", fontWeight: "bold" },
      { text: "for your future house ", fontWeight: "normal" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
    photoUrl:
      "https://images.squarespace-cdn.com/content/v1/58a4b95fbebafb6777c5ede5/1487976510483-207U36DHUB050ODBNPVS/sugarberry-cottage-house-plan-l.jpg",
  },
];
