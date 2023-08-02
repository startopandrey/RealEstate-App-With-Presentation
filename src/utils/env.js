import { Platform } from "react-native";

const liveHost = "https://us-central1-realestate-961c3.cloudfunctions.net";
const localHost = "http://127.0.0.1:5001/realestate-961c3/us-central1";
export const isDevelopment = process.env.NODE_ENV === "development";
// export const host = isDevelopment ? localHost : liveHost;
export const isAndroid = Platform.OS == "android";
export const isMock = true;
export const host = !isDevelopment || isAndroid ? liveHost : localHost;
export const firebaseConfig = {
  apiKey: "AIzaSyDCTLI8IHwqyjs5Pz1bZXdS9O0Hwqo-OF0",
  authDomain: "realestate-961c3.firebaseapp.com",
  projectId: "realestate-961c3",
  storageBucket: "realestate-961c3.appspot.com",
  messagingSenderId: "783850409818",
  appId: "1:783850409818:web:33157ced3065016360ad63",
  measurementId: "G-7GQMY91GJ2",
};
