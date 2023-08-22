import * as Location from "expo-location";
export const isLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  return status === "granted";
};
export const getCurrentUserLoction = async () => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  if (location) {
    return location;
  }
};
