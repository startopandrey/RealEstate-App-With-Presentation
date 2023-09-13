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

  return { latitude: lat, longitude: lng, viewport: geometry.viewport };
};

export const locationFromAddressRequest = async (searchTerm) => {
  return !searchTerm
    ? fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`).then((res) =>
        res.json()
      )
    : getLocationFromAddress(searchTerm);
};

export const locationFromGeoRequest = async (lat, lng) => {
  return getAddressFromLocation(lat, lng);
};
