import camelize from "camelize";
import { host, ipAddress, isMock, serverUrl } from "../../utils/env";
import {
  Apartment,
  Location,
  NewApartment,
} from "../../types/apartments/apartment";
import antwerp from "../../../functions/places/mock/antwerp";
import { useContext } from "react";
import { LocationContext } from "../location/location.context";

export const apartmentsRequest = async (location) => {
  const mockApartment = new Promise((resolve, reject) => {
    console.log(antwerp.results);
    resolve(antwerp);
  });
  return true
    ? fetch(`${serverUrl}/api/apartment/getAllApartments`).then(
        (res: Response) => {
          console.log(res);
          return res.json();
        }
      )
    : fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
        (res: Response) => {
          return res.json();
        }
      );
};

export const apartmentsTransform = ({
  data = [],
  location,
}: {
  data: Apartment[];
  location: Location;
}): Apartment[] => {
  console.log(data, "resl");
  const camelizedApartments = data;
  const mappedResults = camelizedApartments.map((apartment: Apartment) => {
    return apartment;
  });
  const isApartmentInRadius = (marker, circle, radius) => {
    console.log(marker, circle)
    const km = radius / 1000;
    const kx = Math.cos((Math.PI * circle.latitude) / 180) * 111;
    const dx = Math.abs(circle.longitude - marker.longitude) * kx;
    const dy = Math.abs(circle.latitude - marker.latitude) * 111;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  };

  const apartmentsResults = mappedResults.filter(
    (ap) => isApartmentInRadius(ap.location, location, 20000) && ap
  );
  console.log(apartmentsResults, "reso");
  return apartmentsResults;
};
