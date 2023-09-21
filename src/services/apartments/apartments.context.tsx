import React, { useState, useContext, createContext, useEffect } from "react";

import { apartmentsRequest, apartmentsTransform } from "./apartments.service";

import { LocationContext } from "../location/location.context";
import {
  ApartmentsContextType,
  FilterOptionsType,
  Location,
  NewApartment,
} from "../../types/apartments/apartment";
import { FavouritesContext } from "../favourites/favourites.context";

export const ApartmentsContext = createContext<ApartmentsContextType>(
  {} as ApartmentsContextType
);

export const ApartmentsContextProvider = ({ children }) => {
  const [apartments, setApartments] = useState<NewApartment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({});
  const { location } = useContext(LocationContext);
  const { favourites } = useContext(FavouritesContext);
  const retrieveApartments = (
    location: Location,
    filterOptions: FilterOptionsType
  ): void => {
    console.log(filterOptions);
    setIsLoading(true);
    setApartments([]);
    setTimeout(() => {
      apartmentsRequest(filterOptions)
        .then((data) =>
          apartmentsTransform({ data: data.data.data, location: location })
        )
        .then((results: NewApartment[]) => {
          setError("");
          setIsLoading(false);
          setApartments(results);
        })
        .catch((err: string) => {
          setIsLoading(false);
          setError(err);
        });
    }, 1000);
  };

  useEffect(() => {
    if (location) {
      retrieveApartments(location, filterOptions);
    }
  }, [location, filterOptions]);

  return (
    <ApartmentsContext.Provider
      value={{
        apartments,
        isLoading,
        error,
        setFilterOptions,
        filterOptions,
      }}
    >
      {children}
    </ApartmentsContext.Provider>
  );
};
