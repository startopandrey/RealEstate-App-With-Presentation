import { NewApartment } from "../../types/apartments/apartment";

export const postRequest = (apartment: NewApartment) => {
  const apartmentForm = new FormData();
  return fetch("http://192.168.0.9:7777/apartment/create");
};
