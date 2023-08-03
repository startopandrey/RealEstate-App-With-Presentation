import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Search } from "../components/search.component";
// import { LocationContext } from "../../../services/location/location.context";
// import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
import { MapCallout } from "../components/map-callout.component";
import { NavigationProp } from "@react-navigation/native";
const RestaurantsMap = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const { restaurants } = useContext(RestaurantsContext);
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
        {restaurants!.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("RestaurantDetail", {
                    restaurant,
                  });
                }}
              >
                <MapCallout restaurant={restaurant}></MapCallout>
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
  return <RestaurantsMap navigation={navigation}></RestaurantsMap>;
};
