import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../utils/constants";
import { GOOGLE_API_KEY } from "../../utils/env";
export const getLocationPermission = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  return result;
};

export const getLocation = async () => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  if (location) {
    return location;
  }
};
export const getUserCurrentLoction = async (location, setLocation) => {
  const currentLocation = await getLocation();
  console.log(currentLocation, "dfdfdw");
  if (location.latitude !== 0) {
    return;
  }

  if (currentLocation) {
    setLocation({
      latitude: currentLocation?.coords?.latitude,
      longitude: currentLocation?.coords?.longitude,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA,
    });
    // getAddressFromCoords(
    //   generateLocationObject(
    //     currentLocation?.coords?.latitude,
    //     currentLocation?.coords?.longitude,
    //     LONGITUDE_DELTA,
    //     LATITUDE_DELTA
    //   )
    // );
  }
  return location;
};
export const getLocationFromAddress = async (searchTerm) => {
  // return await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${GOOGLE_API_KEY}`
  // ).then((res) => res.json());
  return null;
};
export const getAddressFromLocation = async (lat, lng) => {
  // return await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  // ).then((res) => res.json());
  return null;
};
const getCenterOffsetForAnchor = (
  anchor: { x: number; y: number },
  markerWidth: number,
  markerHeight: number
): { x: number; y: number } => ({
  x: markerWidth * 0.5 - markerWidth * anchor.x,
  y: markerHeight * 0.5 - markerHeight * anchor.y,
});

/** Marker's width */
export const MARKER_WIDTH = 70;
/** Marker's height */
export const MARKER_HEIGHT = 75; // marker height

/** Customizable anchor prop - Specify your desired anchor adjustements here */
export const MARKER_ANCHOR = { x: 0.5, y: 0.9 }; // in my case I customized this based on marker dimensions like this: { x: 0.5, y: 1 - 10 / MARKER_HEIGHT } lifting the marker up a bit
/** auto generated centerOffset prop based on the anchor property */
export const CENTER_OFFSET = getCenterOffsetForAnchor(
  MARKER_ANCHOR,
  MARKER_WIDTH,
  MARKER_HEIGHT
);
