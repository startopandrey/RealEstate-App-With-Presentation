import { serverUrl } from "../../utils/env";
import { Location, NewApartment } from "../../types/apartments/apartment";
import { mockApartments } from "@src/../mockData";

export const apartmentsRequest = async (location, filterOptions) => {
  const mockApartment = new Promise((resolve, reject) => {
    resolve(mockApartments);
  });
  const transformFilterOptions = (filter) => {
    if (filter.categoryId == 0) {
      delete filter.categoryId;
      console.log(filter, "dfdf");
      return filter ?? {};
    }
    return filter;
  };
  console.log(filterOptions.categoryId, "filter");
  const queryString = new URLSearchParams(
    transformFilterOptions(filterOptions)
  ).toString();
  console.log(queryString);
  return true
    ? fetch(`${serverUrl}/api/apartment/filter?${queryString}`).then(
        (res: Response) => {
          return res.json();
        }
      )
    : mockApartment;
};
export const isApartmentInRadius = (
  marker: Location,
  circle: Location,
  radius: number
) => {
  const km = radius;
  const kx = Math.cos((Math.PI * circle.latitude) / 180) * 111;
  const dx = Math.abs(circle.longitude - marker.longitude) * kx;
  const dy = Math.abs(circle.latitude - marker.latitude) * 111;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};
export const apartmentsTransform = ({
  data = [],
  location,
}: {
  data: NewApartment[];
  location: Location;
}): NewApartment[] => {
  console.log(location, "tr");
  const camelizedApartments = data;
  const mappedResults = camelizedApartments.map((apartment: NewApartment) => {
    return apartment;
  });

  const apartmentsResults = mappedResults.filter(
    (ap) => isApartmentInRadius(ap.location, location, 50) && ap
  );

  return apartmentsResults;
};
