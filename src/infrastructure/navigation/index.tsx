import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = (): React.JSX.Element | null => {
  const AuthContext = useContext(AuthenticationContext);
  if (!AuthContext) {
    return null;
  }

  return (
    <NavigationContainer>
      {AuthContext.isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
