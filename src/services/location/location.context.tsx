import React, { useState, useEffect, createContext } from "react";

import { locationRequest, locationTransform } from "./location.service";
interface Location {
  lat: number;
  lng: number;
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}
interface LocationContextType {
  isLoading: boolean;
  error: string | null;
  location?: Location;
  search: (searchKeyword: string) => void;
  keyword: string;
}

export const LocationContext = createContext<LocationContextType>({
  isLoading: false,
  error: null,
  // location: null,
  search: function (searchKeyword: string): void {
    throw new Error("Function not implemented.");
  },
  keyword: ""
});
export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState<Location>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("antwerp");
  const onSearch = (searchKeyword) => {
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
