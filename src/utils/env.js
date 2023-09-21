import { Platform } from "react-native";

const liveHost = "https://realestate-mobileapp-ca10e0a2d5fa.herokuapp.com";
const localHost = `http://192.168.0.11:7777`;
export const isDevelopment = __DEV__;
// export const host = isDevelopment ? localHost : liveHost;
export const isAndroid = Platform.OS == "android";
export const isMock = true;
// export const host = isDevelopment || isAndroid ? liveHost : localHost;
export const host = liveHost;
export const ipAddress = "192.168.0.11";
export const GOOGLE_API_KEY = "AIzaSyAnkf1tS239tx9BRsSKppa2lVOYrz3_JW8";
export const serverUrl = localHost;
export const firebaseConfig = {
  apiKey: "AIzaSyDCTLI8IHwqyjs5Pz1bZXdS9O0Hwqo-OF0",
  authDomain: "realestate-961c3.firebaseapp.com",
  projectId: "realestate-961c3",
  storageBucket: "realestate-961c3.appspot.com",
  messagingSenderId: "783850409818",
  appId: "1:783850409818:web:33157ced3065016360ad63",
  measurementId: "G-7GQMY91GJ2",
};
