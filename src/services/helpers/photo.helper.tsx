import * as ImagePicker from "expo-image-picker";
export const isGalleryPermission = async () => {
  const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

  return galleryStatus.status === "granted";
};
export const pickGalleryImage = async () => {
  const image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });
  return image
};
