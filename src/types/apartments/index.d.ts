import { Apartment } from "./Apartment";

export type ApartmentStackNavigatorParamList = {
    Apartments: undefined;
    ApartmentDetail: {
      apartment: Apartment
    };
  };