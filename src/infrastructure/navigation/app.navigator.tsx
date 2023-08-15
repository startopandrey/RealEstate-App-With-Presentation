import React from "react";
import {
  BottomTabBar,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";

import { ApartmentsNavigator } from "./apartments.navigator";
import { SettingsNavigator } from "./settings.navigator";

import { ApartmentsContextProvider } from "../../services/apartments/apartments.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CartContextProvider } from "../../services/cart/cart.context";
import { CheckoutNavigator } from "./checkout.navigator";
import { colors } from "../theme/colors";
import { AppStackNavigatorParamList, TabIcon } from "src/types/app";
import styled from "styled-components/native";
import { FavouritesScreen } from "../../features/favourites/screens/favourites.screen";
import { BlurView } from "expo-blur";
import { View } from "react-native";
import { transparent } from "react-native-paper/lib/typescript/styles/colors";
import { ProfileNavigator } from "./profile.navigator";

const Tab = createBottomTabNavigator<AppStackNavigatorParamList>();

const TAB_ICON: TabIcon = {
  Apartments: "home",
  Favourites: "heart",
  Map: "map",
  Profile: "user",
};
const Dot = styled.View<{ focused: boolean }>`
  background: ${(props) =>
    props.focused ? props.theme.colors.ui.primary : "transparent"};
  position: absolute;
  top: 40px;
  width: 8px;
  border-radius: 50%;
  height: 8px;
`;
const TabIconWrapper = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  justify-content: center;
  align-items: center;
`;

const createScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const iconName: keyof typeof Octicons.glyphMap = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ color, focused }) => (
      <TabIconWrapper>
        {route.name === "Map" || route.name === "Profile" ? (
          <FontAwesome5 name={`${iconName}`} size={22} color={color} />
        ) : (
          <Octicons name={`${iconName}`} size={22} color={color} />
        )}

        <Dot focused={focused} />
      </TabIconWrapper>
    ),

    title: "",
  };
};
const CustomTabBar = (props) => {
  return (
    <BlurView
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      intensity={90}
    >
      <BottomTabBar
        style={{ backgroundColor: "transparent", height: 80 }}
        {...props}
      />
    </BlurView>
  );
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
            tabBar={(props) => <CustomTabBar {...props} />}
          >
            <Tab.Screen name="Apartments" component={ApartmentsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
          </Tab.Navigator>
        </CartContextProvider>
      </ApartmentsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
