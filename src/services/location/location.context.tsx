import React, { useState, useEffect, createContext } from "react";

import { locationRequest, locationTransform } from "./location.service";
import { Location } from "src/types/apartments/apartment";
interface LocationContextType {
  isLoading: boolean;
  error: string | null;
  location: Location | undefined;
  search: (searchKeyword: string) => void;
  keyword: string;
}

export const LocationContext = createContext<LocationContextType>(
  {} as LocationContextType
);
export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState<Location>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("vinnitsa");

  const onSearch = (searchKeyword) => {
 
    console.log(searchKeyword);
    setKeyword(searchKeyword);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!keyword.length) {
      return;
    }

    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        console.log(result, "res");
        setError(null);
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{ isLoading, error, location, search: onSearch, keyword }}
    >
      {children}
    </LocationContext.Provider>
  );
};
