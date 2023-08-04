import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ApartmentsNavigator } from "./apartments.navigator";
import { SettingsNavigator } from "./settings.navigator";

import { ApartmentsContextProvider } from "../../services/apartments/apartments.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CartContextProvider } from "../../services/cart/cart.context";
import { CheckoutNavigator } from "./checkout.navigator";
import { colors } from "../theme/colors";
import { AppStackNavigatorParamList, TabIcon } from "src/types/app";
const Tab = createBottomTabNavigator<AppStackNavigatorParamList>();

const TAB_ICON: TabIcon = {
  Apartments: "md-home",
  Checkout: "md-cart",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <ApartmentsContextProvider>
        <CartContextProvider>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: colors.ui.primary,
              inactiveTintColor: colors.ui.muted,
            }}
          >
            <Tab.Screen name="Apartments" component={ApartmentsNavigator} />
            <Tab.Screen name="Checkout" component={CheckoutNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </CartContextProvider>
      </ApartmentsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
