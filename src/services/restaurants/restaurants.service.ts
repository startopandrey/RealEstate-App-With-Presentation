import camelize from "camelize";
import { host, isMock } from "../../utils/env";
import { Restaurant } from "../../types/restaurants/restaurant";
export const restaurantsRequest = (location: string) => {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res: Response) => {
      return res.json();
    }
  );
};

export const restaurantsTransform = ({
  results = [],
}: {
  results: Restaurant[];
}): Restaurant[] => {
  const camelizedRestaurants = camelize(results);
  const mappedResults = camelizedRestaurants.map((restaurant: Restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.openingHours && restaurant.openingHours.openNow,
      isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPORARILY",
    };
  });

  return mappedResults;
};
