import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";
import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Search } from "../components/search.component";
// import { LocationContext } from "../../../services/location/location.context";
// import { ApartmentsContext } from "../../../services/apartments/apartments.context";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
import { MapCallout } from "../components/map-callout.component";
import { NavigationProp } from "@react-navigation/native";
const ApartmentsMap = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const { apartments } = useContext(ApartmentsContext);
  const { location } = useContext(LocationContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location!;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Text>hi</Text>
      <Search></Search>
      <Map
        region={{
          latitude: lat,
          longitudeDelta: 0.01,
          latitudeDelta: latDelta,
          longitude: lng,
        }}
      >
        {apartments!.map((apartment) => {
          return (
            <Marker
              key={apartment.name}
              title={apartment.name}
              coordinate={{
                latitude: apartment.geometry.location.lat,
                longitude: apartment.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("ApartmentDetail", {
                    apartment,
                  });
                }}
              >
                <MapCallout apartment={apartment}></MapCallout>
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};

import { AppStackNavigatorParamList } from "src/types/app";
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
      ></MapView>
    );
  }
  return <ApartmentsMap navigation={navigation}></ApartmentsMap>;
};
