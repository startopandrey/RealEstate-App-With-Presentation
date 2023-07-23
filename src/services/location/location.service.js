import camelize from "camelize";
import { host } from "../../utils/env";

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  console.log(result, "re");
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};

export const locationRequest = async (searchTerm) => {

  return fetch(`${host}/geocode?city=${searchTerm}&mock=true`).then((res) =>
    res.json()
  );
};
