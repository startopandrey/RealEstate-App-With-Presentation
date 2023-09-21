import camelize from "camelize";
import { GOOGLE_API_KEY, host, isMock } from "../../utils/env";
import {
  getAddressFromLocation,
  getLocationFromAddress,
} from "../helpers/location.helper";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "@src/utils/constants";

export const locationTransform = (result) => {
  const formattedResponse = camelize(result).data.data;
  if (formattedResponse) {
    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return {
      latitude: lat,
      longitude: lng,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA,
    };
  }
};

export const locationFromAddressRequest = async (searchTerm) => {
  return getLocationFromAddress(searchTerm);
};

export const locationFromGeoRequest = async (lat, lng) => {
  try {
    return await getAddressFromLocation(lat, lng);
  } catch (error) {
    return null;
  }
};
