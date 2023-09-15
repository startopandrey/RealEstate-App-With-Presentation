import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ApartmentsScreen } from "../../features/apartments/screens/apartment.screen";
import { ApartmentDetailScreen } from "../../features/apartments/screens/apartment-detail.screen";

import { ApartmentStackNavigatorParamList } from "@src/types/apartments/apartment";
import { ApartmentGalleryScreen } from "../../features/apartments/screens/apartment-gallery.screen";

const ApartmentStack = createStackNavigator<ApartmentStackNavigatorParamList>();

export const ApartmentsNavigator = () => {
  return (
    <ApartmentStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ApartmentStack.Screen name="Apartments" component={ApartmentsScreen} />
      <ApartmentStack.Screen
        name="ApartmentDetail"
        component={ApartmentDetailScreen}
      />
      <ApartmentStack.Screen
        name="ApartmentGallery"
        component={ApartmentGalleryScreen}
      />
    </ApartmentStack.Navigator>
  );
};
