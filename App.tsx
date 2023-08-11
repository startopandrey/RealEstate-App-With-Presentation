import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { AppRegistry, Platform } from "react-native";
import { registerRootComponent } from "expo";
import { firebaseInitialize } from "./src/utils/initializeFirebase";
import {
  useFonts as useRaleway,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  useFonts as useMontserrat,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

firebaseInitialize();
// export const auth = getAuth(app);
export default function App() {
  const [ralewayLoaded] = useRaleway({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_700Bold,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold,
  });
  const [montserratLoaded] = useMontserrat({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  if (!ralewayLoaded || !latoLoaded || !montserratLoaded) {
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
