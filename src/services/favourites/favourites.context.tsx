import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";
import { Apartment } from "src/types/apartments/apartment";
interface FavouritesContextType {
  favourites: Apartment[];
  addToFavourites: (apartment: Apartment) => void;
  removeFromFavourites: (apartment: Apartment) => void;
  removeAllFavourites: (uid: string) => void;
}
export const FavouritesContext = createContext<FavouritesContextType>(
  {} as FavouritesContextType
);

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [favourites, setFavourites] = useState<Apartment[]>([]);

  const saveFavourites = async (value: Apartment[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const add = (apartment: Apartment) => {
    setFavourites([...favourites, apartment]);
  };

  const remove = (apartment: Apartment) => {
    const newFavourites = favourites.filter((x) => x.id !== apartment.id);

    setFavourites(newFavourites);
  };
  const removeAll = async (uid) => {
    const newFavourites = [];

    setFavourites(newFavourites);
    await AsyncStorage.setItem(`@favourites-${uid}`, "");
  };
  useEffect(() => {
    if (user && user.uid) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
        removeAllFavourites: removeAll,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
