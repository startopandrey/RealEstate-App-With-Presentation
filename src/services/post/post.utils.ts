import { NewApartment } from "../../types/apartments/apartment";

export const isValidApartment = (apartment: NewApartment) => {
  if (!apartment) {
    return false;
  }
  const {
    title,
    description,
    category,
    price,
    address,
    squareMeter,
    photos,
    authorId,
  } = apartment;
  console.log(photos);
  if (
    title &&
    description &&
    category?.id &&
    price &&
    address &&
    squareMeter &&
    photos.length !== 0
    // authorId
  ) {
    return true;
  }
  return false;
};
