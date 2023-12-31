import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { AppRegistry } from "react-native";
import { useLoadFonts } from "./src/utils/loadFonts";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
  "Error: Unable to resolve module ./Libraries/Components/DatePicker/DatePickerIOS",
]);
export default function App(): React.JSX.Element | null {
  // const isFontsLoaded = useLoadFonts();
  // if (!isFontsLoaded) {
  //   return null;
  // }
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

AppRegistry.registerComponent("main", () => App);
