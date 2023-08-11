import React, { useState, useContext, createContext, useEffect } from "react";

import { apartmentsRequest, apartmentsTransform } from "./apartments.service";

import { LocationContext } from "../location/location.context";
import { Apartment } from "src/types/apartments/apartment";
interface ApartmentsContextType {
  apartments: Apartment[];
  isLoading: boolean;
  error?: string;
}

export const ApartmentsContext = createContext<ApartmentsContextType>(
  {} as ApartmentsContextType
);

export const ApartmentsContextProvider = ({ children }) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { location } = useContext(LocationContext);

  const retrieveApartments = (loc: string): void => {
    setIsLoading(true);
    setApartments([]);

    apartmentsRequest(loc)
      .then(apartmentsTransform)
      .then((results: Apartment[]) => {
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
      const locationString: string = `${location.lat},${location.lng}`;
      retrieveApartments(locationString);
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
