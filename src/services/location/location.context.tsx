import React, { useState, useEffect, createContext } from "react";

import {
  locationFromAddressRequest,
  locationFromGeoRequest,
  locationTransform,
} from "./location.service";
import { Location } from "src/types/apartments/apartment";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  initialRegion,
} from "../../utils/constants";
import {
  getLocation,
  getLocationPermission,
  isLocationPermission,
} from "../helpers/location.helper";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface LocationContextType {
  userLocation: Location;
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
  const [userLocation, setUserLocation] = useState<Location>(initialRegion);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("Vinnitysa");
  const [isPermissionsAccepted, setIsPermissionsAccepted] =
    useState<boolean>(false);
  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    console.log(searchKeyword);
    setKeyword(searchKeyword);
  };
  const getUserLocationFromStorage = async (name) => {
    const value = await AsyncStorage.getItem(`@${name}`);
    if (value !== null) {
      const json = JSON.parse(value);
      console.log(json, "dfde");
      setLocation(json);
      return json;
    }
  };
  const setUserLocationToStorage = async (userLocation) => {
    const userLocationJson = JSON.stringify({
      latitude: userLocation?.coords?.latitude,
      longitude: userLocation?.coords?.longitude,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA,
    });
    await AsyncStorage.setItem("@user-location", userLocationJson);
  };
  useEffect(() => {
    const handleDefaultLocation = async () => {
      const locationFromStorage = await getUserLocationFromStorage(
        "user-location"
      );
      if (location) {
        console.log(location, "curr loc");
        locationFromGeoRequest(location.latitude, location.longitude)
          .then(locationTransform)
          .then((result) => {
            console.log(result, "resl");
            setError(null);
            setIsLoading(false);
            setLocation(result);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
          });
        return;
      }
      const getUserCurrentLocation = async () => {
        const { status } = await getLocationPermission();
        if (status !== "granted") {
          /* If user hasn't granted permission to geolocate himself herself */
          setIsPermissionsAccepted(false);
          Alert.alert(
            "User location not detected",
            "You haven't granted permission to detect your location.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
          return;
        }
        setIsPermissionsAccepted(true);
        const currentLocation = await getLocation();

        if (currentLocation) {
          setUserLocationToStorage(currentLocation);
          locationFromGeoRequest(
            currentLocation?.coords?.latitude,
            currentLocation?.coords?.longitude
          )
            .then(locationTransform)
            .then((result) => {
              console.log(result);
              setError(null);
              setIsLoading(false);
              setLocation({
                latitude: currentLocation?.coords?.latitude,
                longitude: currentLocation?.coords?.longitude,
                longitudeDelta: LONGITUDE_DELTA,
                latitudeDelta: LATITUDE_DELTA,
              });
            })
            .catch((err) => {
              setIsLoading(false);
              setError(err);
            });
        }
      };
      if (!locationFromStorage) {
        console.log("curr loc");
        getUserCurrentLocation();
      }
    };
    if (!keyword.length) {
      console.log("dfdre");
      handleDefaultLocation();
      return;
    }

    locationFromAddressRequest(keyword.toLowerCase())
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
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
