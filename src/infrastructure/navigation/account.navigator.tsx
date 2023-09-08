import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OnboardingScreen } from "../../features/account/screens/onboarding.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { AccountStackNavigatorParamList } from "src/types/accout";

const Stack = createStackNavigator<AccountStackNavigatorParamList>();

export const AccountNavigator = (): React.JSX.Element => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
