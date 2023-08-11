import firebase from "firebase";

import { firebaseConfig } from "./env";
export const firebaseInitialize = (): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};
