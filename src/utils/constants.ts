import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const OUTER_CARD_HEIGHT = 170;
export const OUTER_CARD_WIDTH = width;

export const INNER_CARD_HEIGHT = 160;
export const INNER_CARD_WIDTH = width * 0.9;
export const LATITUDE_DELTA = 0.01;
export const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
export const initialRegion = {
  longitude: 37.775388,
  latitude: -122.43842,
  longitudeDelta: LONGITUDE_DELTA,
  latitudeDelta: LATITUDE_DELTA,
};
