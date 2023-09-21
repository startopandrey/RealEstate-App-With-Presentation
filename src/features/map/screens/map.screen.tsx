import React, { useContext } from "react";

import MapView from "react-native-maps";

import { LocationContext } from "@src/services/location/location.context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { LocationContext } from "@src/services/location/location.context";
// import { ApartmentsContext } from "@src/services/apartments/apartments.context";

import { AppStackNavigatorParamList } from "@src/types/app";

import { ApartmentsMap } from "../components/apartments-map.component";
import { ApartmentsContext } from "@src//services/apartments/apartments.context";
import { initialRegion } from "@src/utils/constants";
import { View } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "@src/components/utility/safe-area.component";

type Props = NativeStackNavigationProp<AppStackNavigatorParamList, "Map">;
export const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
export const MapScreen = ({ navigation, route }: Props) => {
  const { location } = useContext(LocationContext);
  const { apartments } = useContext(ApartmentsContext);


  return <ApartmentsMap route={route} navigation={navigation} />;
};
