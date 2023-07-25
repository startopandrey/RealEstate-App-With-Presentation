import { Platform } from "react-native";

const liveHost = "https://us-central1-realestate-961c3.cloudfunctions.net";
const localHost = "http://127.0.0.1:5001/realestate-961c3/us-central1";
export const isDevelopment = process.env.NODE_ENV === "development";
// export const host = isDevelopment ? localHost : liveHost;
export const isAndroid = Platform.OS == "android";
export const isMock = true;
export const host = !isDevelopment || isAndroid ? liveHost : localHost;
