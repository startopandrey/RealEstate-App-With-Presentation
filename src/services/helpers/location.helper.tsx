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
