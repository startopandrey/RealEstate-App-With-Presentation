import React, { useState, useContext, createContext, useEffect } from "react";

import { apartmentsRequest, apartmentsTransform } from "./apartments.service";

import { LocationContext } from "../location/location.context";
import {
  Apartment,
  Location,
  NewApartment,
} from "../../types/apartments/apartment";
import { FavouritesContext } from "../favourites/favourites.context";
interface ApartmentsContextType {
  apartments: NewApartment[];
  isLoading: boolean;
  error?: string;
}

export const ApartmentsContext = createContext<ApartmentsContextType>(
  {} as ApartmentsContextType
);

export const ApartmentsContextProvider = ({ children }) => {
  const [apartments, setApartments] = useState<NewApartment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { location } = useContext(LocationContext);
  const { favourites } = useContext(FavouritesContext);

  const retrieveApartments = (loc: Location): void => {
    setIsLoading(true);
    setApartments([]);
    apartmentsRequest(loc)
      .then((data) => apartmentsTransform({ data: data.data, location: loc }))
      .then((results: NewApartment[]) => {
        console.log(results, "lll");
        setError("");
        setIsLoading(false);
        setApartments(results);
      })
      .catch((err: string) => {
        setIsLoading(false);
        setError(err);
      });
  };
  useEffect(() => {
    if (location) {
      retrieveApartments(location);
    }
  }, [location]);

  return (
    <ApartmentsContext.Provider
      value={{
        apartments,
        isLoading,
        error,
      }}
    >
      {children}
    </ApartmentsContext.Provider>
  );
};
