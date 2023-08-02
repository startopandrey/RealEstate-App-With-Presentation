import { Restaurant } from "./restaurant";

export type RestaurantStackNavigatorParamList = {
    Restaurants: undefined;
    RestaurantDetail: {
      restaurant: Restaurant
    };
  };