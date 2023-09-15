import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ApartmentsScreen } from "@src/features/apartments/screens/apartment.screen";
import { ApartmentDetailScreen } from "@src/features/apartments/screens/apartment-detail.screen";
import { ApartmentStackNavigatorParamList } from "@src/types/apartments/apartment";
import { ApartmentGalleryScreen } from "@src/features/apartments/screens/apartment-gallery.screen";

const ApartmentStack = createStackNavigator<ApartmentStackNavigatorParamList>();

export const ApartmentsNavigator = (): React.JSX.Element => {
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
