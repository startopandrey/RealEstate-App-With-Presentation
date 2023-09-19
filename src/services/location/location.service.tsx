import camelize from "camelize";
import { GOOGLE_API_KEY, host, isMock } from "../../utils/env";
import {
  getAddressFromLocation,
  getLocationFromAddress,
} from "../helpers/location.helper";

export const locationTransform = (result) => {
  const formattedResponse = camelize(result).data.data;
  if (formattedResponse) {
    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return { latitude: lat, longitude: lng, viewport: geometry.viewport };
  }
};

export const locationFromAddressRequest = async (searchTerm) => {
  try {
    return await getLocationFromAddress(searchTerm);
  } catch (error) {
    return null;
  }
};

export const locationFromGeoRequest = async (lat, lng) => {
  try {
    return await getAddressFromLocation(lat, lng);
  } catch (error) {
    return null;
  }
};
