import camelize from "camelize";
import { GOOGLE_API_KEY, host, isMock } from "../../utils/env";

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);

  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  console.log(
    { latitude: lat, longitude: lng, viewport: geometry.viewport },
    process.env.GOOGLE_API_KEY
  );
  return { latitude: lat, longitude: lng, viewport: geometry.viewport };
};

export const locationRequest = async (searchTerm) => {
  return false
    ? fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`).then((res) =>
        res.json()
      )
    : fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${GOOGLE_API_KEY}`
      ).then((res) => res.json());
};
