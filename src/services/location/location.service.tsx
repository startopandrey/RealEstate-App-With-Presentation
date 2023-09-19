import camelize from "camelize";
import { GOOGLE_API_KEY, host, isMock } from "../../utils/env";
import {
  getAddressFromLocation,
  getLocationFromAddress,
} from "../helpers/location.helper";

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);

  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return {
    latitude: 49.233083,
    longitude: 28.468217,
    viewport: {
      northeast: {
        lat: 49.27902,
        lng: 28.5710879,
      },
      southwest: {
        lat: 49.190448,
        lng: 28.3681799,
      },
    },
  };
};

export const locationFromAddressRequest = async (searchTerm) => {
  return getLocationFromAddress(searchTerm);
};

export const locationFromGeoRequest = async (lat, lng) => {
  return getAddressFromLocation(lat, lng);
};
