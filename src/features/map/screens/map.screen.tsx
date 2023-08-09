import React, { useContext } from "react";

import MapView from "react-native-maps";

import { LocationContext } from "../../../services/location/location.context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { LocationContext } from "../../../services/location/location.context";
// import { ApartmentsContext } from "../../../services/apartments/apartments.context";

import { AppStackNavigatorParamList } from "src/types/app";

import { ApartmentsMap } from "../components/apartments-map.component";

type Props = NativeStackNavigationProp<AppStackNavigatorParamList, "Map">;
export const MapScreen = ({ navigation }: Props) => {
  const { location } = useContext(LocationContext);
  if (!location) {
    return (
      <MapView
        region={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      />
    );
  }
  return <ApartmentsMap navigation={navigation} />;
};
