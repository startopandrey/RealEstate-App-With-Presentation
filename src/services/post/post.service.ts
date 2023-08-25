import axios, { AxiosResponse } from "axios";
import { NewApartment } from "../../types/apartments/apartment";
export const postTransform = (apartment: NewApartment) => {
  const {
    title,
    description,
    photos,
    location,
    category,
    address,
    squareMeter,
    price,
    authorId,
    totalRooms,
    facilities,
  }: NewApartment = apartment;
  console.log(location);
  const formApartment = new FormData();
  formApartment.append("title", title);
  formApartment.append("description", description);
  formApartment.append("location", JSON.stringify(location));
  formApartment.append("category", JSON.stringify(category));
  formApartment.append("address", address);
  formApartment.append("price", price);
  formApartment.append("squareMeter", squareMeter);
  formApartment.append("authorId", authorId);
  formApartment.append("totalRooms", totalRooms);
  formApartment.append("facilities", JSON.stringify(facilities));
  if (photos) {
    photos.forEach((photo) => {
      const photoUrl = photo.photoUrl;
      const photoName = photo.name ?? "image";
      const type = `image/${photoUrl.split(".")[1]}`;
      formApartment.append("photos", {
        name: photoName,
        type: type,
        uri: photoUrl,
      });
    });
  } else {
    return;
  }

  return formApartment;
};
export const postRequest = async (
  apartment: NewApartment
): Promise<AxiosResponse<any, any>> => {
  postTransform(apartment);
  //   const apartmentForm = new FormData();

  // return fetch("http://192.168.0.9:7777/apartment/create");
  const res = await axios.post(
    "http://192.168.0.9:7777/apartment/create",
    postTransform(apartment),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(res.data);
  return res;
};
