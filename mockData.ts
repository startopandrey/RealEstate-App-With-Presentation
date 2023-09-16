import { initialRegion } from "./src/utils/constants";
import {
  AgentType,
  ApartmentFeature,
  NewApartment,
  TopArea,
} from "./src/types/apartments/apartment";
import { OnboardingBlockType } from "./src/types/accout/index";

export const featuresListMock: ApartmentFeature[] = [
  { id: 1, type: "bedroom", quantity: 1 },
  { id: 2, type: "bathroom", quantity: 1 },
  { id: 3, type: "balcony", quantity: 1 },
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
export const initialOnboardingBlocks: OnboardingBlockType[] = [
  {
    titleArray: [
      { text: "Find best place to stay in", fontWeight: "normal" },
      { text: "good price", fontWeight: "bold" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
    photoUrl:
      "https://www.thespruce.com/thmb/uaCt1KodctrWniOEyCv2gMrE1QU=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/large-multi-condos-building-blocks-with-bicycles-lane-1174752803-9d506d8c43484c34b32f03afecf0d8c3.jpg",
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
      "https://as2.ftcdn.net/v2/jpg/00/41/61/07/1000_F_41610728_ivYI2JmcGhhdgzBZNqKh9sOX1hZl7mDg.jpg",
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
      "https://www.southernliving.com/thmb/R50HDhYdsNA9mQKzE9zFenYcA4M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2270901_cainc0259_1-2000-36b6699219454ee298de1d4565f1ab7d.jpg",
  },
];
export const mockApartments: NewApartment[] = [
  {
    category: { id: 2, name: "Apartment" },
    location: {
      latitude: 49.186146522742405,
      longitude: 28.19077276571831,
      latitudeDelta: 0.04565320745388135,
      longitudeDelta: 0.0798600741532951,
    },
    _id: "64fcb69b05a4b9ee4a2b4eb6",
    title: "Vienn",
    photos: [
      {
        url: "http://res.cloudinary.com/dqf54iail/image/upload/v1694283418/ApartmentPhotos/ixtbqalhkoqpo88mcazf.jpg",
        public_id: "ApartmentPhotos/ixtbqalhkoqpo88mcazf",
        width: 1242,
        height: 220,
        _id: "64fcb69b05a4b9ee4a2b4eb7",
      },
    ],
    facilities: [],
    features: [
      {
        id: "1",
        type: "bedroom",
        quantity: 2,
        _id: "64fcb69b05a4b9ee4a2b4eb8",
      },
      {
        id: "2",
        type: "bathroom",
        quantity: 1,
        _id: "64fcb69b05a4b9ee4a2b4eb9",
      },
      {
        id: "3",
        type: "balcony",
        quantity: 1,
        _id: "64fcb69b05a4b9ee4a2b4eba",
      },
    ],
    price: 500,
    address: "Ukraine, Pultivtsi, Павленка вулиця",
    description: "Fghjk",
    squareMeter: "60",
    authorId: "64f8ac46d678a1126ba3a8d3",
    totalRooms: 1,
    __v: 0,
    isMock: true,
  },
];
export const topAreasMock: TopArea[] = [
  {
    id: 1,
    areaName: "Kyiv",
    photoUrl:
      "https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/05/02/17/kiev.jpg?width=1200&auto=webp&quality=75",
  },
  {
    id: 2,
    areaName: "Vinnitysa",
    photoUrl:
      "https://toget.education/wp-content/uploads/2016/02/vinnitsa4-300x210.png",
  },
  {
    id: 3,
    areaName: "Florence",
    photoUrl: "https://media.timeout.com/images/105879414/750/422/image.jpg",
  },
];
export const agentsMock: AgentType[] = [
  {
    agentName: "Anderea",
  },
  {
    agentName: "Aaron",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIsLl_2a68ulkk-voH_jG_wNMlf7HTqEIXGC4N4LWuWzmuKeVE8Osr9f-NiW7WzjTqrRk&usqp=CAU",
  },
  {
    agentName: "Michael",
  },
  {
    agentName: "Hairry",
    photoUrl:
      "https://getgoodhead.com/wp-content/uploads/2018/04/Jake-Roth-Best-Hair.jpg",
  },
];
