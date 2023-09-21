import axios from "axios";
import { NewApartment } from "../../types/apartments/apartment";
import { serverUrl } from "../../utils/env";
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
    features,
    facilities,
  }: NewApartment = apartment;
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
  formApartment.append("features", JSON.stringify(features));
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
export const postRequest = async (apartment: NewApartment): Promise<any> => {
  try {
    const res = await axios.post(
      `${serverUrl}/apartment/create`,
      postTransform(apartment),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
