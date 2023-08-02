import React, { useState, useContext, createContext, useEffect } from "react";

import {
  restaurantsRequest,
  restaurantsTransform,
} from "./restaurants.service";

import { LocationContext } from "../location/location.context";
import { Restaurant } from "src/types/restaurants/restaurant";
interface RestaurantsContextType {
  restaurants?: Restaurant[];
  isLoading?: boolean;
  error?: string;
}

export const RestaurantsContext = createContext<RestaurantsContextType>({});

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);

    restaurantsRequest(loc)
      .then(restaurantsTransform)
      .then((results: Restaurant[]) => {
        setError("");
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch((err: string) => {
        setIsLoading(false);
        setError(err);
      });
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
