import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";
import firebase from "firebase";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { AppRegistry, Platform, View } from "react-native";
import { registerRootComponent } from "expo";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDCTLI8IHwqyjs5Pz1bZXdS9O0Hwqo-OF0",
  authDomain: "realestate-961c3.firebaseapp.com",
  projectId: "realestate-961c3",
  storageBucket: "realestate-961c3.appspot.com",
  messagingSenderId: "783850409818",
  appId: "1:783850409818:web:33157ced3065016360ad63",
  measurementId: "G-7GQMY91GJ2",
});
// export const auth = getAuth(app);
export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
registerRootComponent(App);
AppRegistry.registerComponent("main", () => App);

if (Platform.OS === "web") {
  const rootTag =
    document.getElementById("root") || document.getElementById("main");
  AppRegistry.runApplication("main", { rootTag });
}
