import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Octicons, FontAwesome5, Ionicons } from "@expo/vector-icons";

import { ApartmentsNavigator } from "./apartments.navigator";

import { ApartmentsContextProvider } from "../../services/apartments/apartments.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CartContextProvider } from "../../services/cart/cart.context";
import { colors } from "../theme/colors";
import { AppStackNavigatorParamList, TabIcon } from "src/types/app";
import { FavouritesScreen } from "../../features/favourites/screens/favourites.screen";
import { ProfileNavigator } from "./profile.navigator";
import { PostNavigator } from "./post.navigator";
import { theme } from "../theme";
import {
  CustomBlurView,
  CustomBottomTabBar,
  Dot,
  PostIconWrapper,
  TabIconWrapper,
} from "./app.styles";

const Tab = createBottomTabNavigator<AppStackNavigatorParamList>();

const TAB_ICON: TabIcon = {
  Apartments: "home",
  Favourites: "heart",
  Post: "add-outline",
  Map: "map",
  Profile: "user",
};

const createScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const iconName:
    | keyof typeof Octicons.glyphMap
    | keyof typeof Ionicons.glyphMap = TAB_ICON[route.name];
  const renderIcon = (routeName, color) => {
    if (routeName === "Map" || routeName === "Profile") {
      return <FontAwesome5 name={`${iconName}`} size={22} color={color} />;
    }
    if (routeName === "Post") {
      return (
        <PostIconWrapper>
          <Ionicons
            name={`${iconName}`}
            size={30}
            color={theme.colors.text.inverse}
          />
        </PostIconWrapper>
      );
    }
    return <Octicons name={`${iconName}`} size={22} color={color} />;
  };
  return {
    tabBarIcon: ({ color, focused }) => (
      <TabIconWrapper>
        {renderIcon(route.name, color)}
        {route.name !== "Post" && <Dot focused={focused} />}
      </TabIconWrapper>
    ),

    title: "",
  };
};
const CustomTabBar = (props) => {
  return (
    <CustomBlurView intensity={90}>
      <CustomBottomTabBar {...props} />
    </CustomBlurView>
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
            <Tab.Screen name="Post" component={PostNavigator} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
          </Tab.Navigator>
        </CartContextProvider>
      </ApartmentsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
