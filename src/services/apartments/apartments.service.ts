import camelize from "camelize";
import { host, isMock } from "../../utils/env";
import { Apartment } from "../../types/apartments/apartment";
export const apartmentsRequest = (location: string = "51.219448,4.402464") => {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res: Response) => {
      return res.json();
    }
  );
};

export const apartmentsTransform = ({
  results = [],
}: {
  results: Apartment[];
}): Apartment[] => {
  const camelizedApartments = camelize(results);
  const mappedResults = camelizedApartments.map((apartment: Apartment) => {
    return {
      ...apartment,
      address: apartment.vicinity,
    };
  });

  return mappedResults;
};
