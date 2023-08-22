import * as Location from "expo-location";
export const isLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  return status === "granted";
};
export const getCurrentLoction = async ()=> {
    let location = await Location.getCurrentPositionAsync({

        accuracy: 
        Location.Accuracy.High,
      });
    if (location) {
        return location
    }
}