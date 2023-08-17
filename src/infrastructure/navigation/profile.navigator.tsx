import React from "react";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { ProfileStackNavigatorParamList } from "../../types/profile";
import { ProfileEditScreen } from "../../features/profile/screens/profile-edit.screen";

const ProfileStack = createStackNavigator<ProfileStackNavigatorParamList>();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ProfileStack.Screen
        options={{
          header: () => null,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        options={{
          header: () => null,
        }}
        name="ProfileEdit"
        component={ProfileEditScreen}
      />
    </ProfileStack.Navigator>
  );
};
