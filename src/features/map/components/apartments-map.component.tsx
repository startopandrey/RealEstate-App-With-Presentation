import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";
import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { Search } from "../components/search.component";
import { CustomMarker } from "../components/custom-marker.component";
import { ApartmentInfoCard } from "../../../features/apartments/components/apartment-info-card.component";
import { INNER_CARD_WIDTH, OUTER_CARD_WIDTH } from "../../../utils/constants";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { theme } from "../../../infrastructure/theme";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Apartment } from "../../../types/apartments/apartment";
import { ListRenderItem } from "react-native";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
const MapApartmentCardsWrapper = styled.View`
  flex: 1;
  width: ${OUTER_CARD_WIDTH}px;
  align-items: "center";
  flex-direction: "row";
  background-color: "transparent";

  z-index: 999;
  position: absolute;
  bottom: 20px;
`;
const MapApartmentItem = styled.TouchableOpacity`
  width: ${OUTER_CARD_WIDTH}px;
  justify-content: center;
`;
const MapApartmentCards = styled(Animated.FlatList)``;
const ApartmentInfoCardWrapper = styled.View`
  width: ${INNER_CARD_WIDTH}px;
  align-self: center;
`;
const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  /* flex-direction: row; */
  align-items: center;
  justify-content: flex-end;
  z-index: 99;
  top: 40px;
  width: 100%;
`;
interface InitialRegionType {
  latitude: number;
  longitudeDelta: 0.01;
  latitudeDelta: number;
  longitude: number;
}
export const ApartmentsMap = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}) => {
  // states
  const selectedApartment: Apartment = route.params?.selectedApartment;

  console.log(selectedApartment);
  const [latDelta, setLatDelta] = useState(0);
  const [initialRegion, setInitialRegion] = useState<InitialRegionType>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: latDelta,
    longitudeDelta: 0.01,
  });
  const [apartmentsDisplayed, setApartmentsDisplayed] = useState<Apartment[]>(
    []
  );
  // contexts
  const { apartments } = useContext(ApartmentsContext);
  const { location } = useContext(LocationContext);
  //refs
  const _map = useRef(null);
  const flatlistRef = useRef(null);
  const mapIndex = useRef(0);
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  const { lat, lng, viewport } = location!;
  const onScroll = (event) => {
    const xDistance = event.nativeEvent.contentOffset.x;
    if (xDistance % OUTER_CARD_WIDTH === 0) {
      // When scroll ends
      const index = xDistance / OUTER_CARD_WIDTH;
      if (mapIndex.current === index) {
        return;
      }
      console.log("scroll end reached");
      mapIndex.current = index;
      const coordinate =
        apartmentsDisplayed[index] && apartmentsDisplayed[index].geometry;

      setTimeout(
        () =>
          _map.current?.animateToRegion(
            {
              latitude: coordinate.location.lat,
              longitude: coordinate.location.lng,
              latitudeDelta: latDelta,
              longitudeDelta: 0.01,
            },
            350
          ),
        10
      );
    }
  };
  useEffect(() => {
    if (!selectedApartment) {
      setApartmentsDisplayed([...apartments]);
      return;
    }
    setApartmentsDisplayed([selectedApartment, ...apartments]);
  }, [apartments, selectedApartment]);
  useEffect(() => {
    if (!selectedApartment) {
      setInitialRegion({
        latitude: lat,
        longitudeDelta: 0.01,
        latitudeDelta: latDelta,
        longitude: lng,
      });
      return;
    }
    setInitialRegion({
      latitude: selectedApartment.geometry.location.lat,
      longitudeDelta: 0.01,
      latitudeDelta: latDelta,
      longitude: selectedApartment.geometry.location.lng,
    });
  }, [lat, lng, viewport, latDelta, selectedApartment]);
  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  const onMarkerPress = (id: string) => {
    const apartmentIndexById = apartments.findIndex((item) => item.id === id);

    // In this case we dont need to animate to region, it happens by default
    mapIndex.current = apartmentIndexById;
    flatlistRef.current?.scrollToIndex({
      index: apartmentIndexById,
      animate: true,
    });
  };
  const renderApartmentItem = ({ item }): React.ReactElement => {
    const apartment: Apartment = item;
    return (
      <MapApartmentItem
        hitSlop={{
          top: 30,
          right: 30,
          left: 30,
          bottom: 30,
        }}
        onPress={() =>
          navigation.navigate("ApartmentDetail", {
            go_back_key: `${apartment.id}-map`,
            apartment: apartment,
          })
        }
      >
        <ApartmentInfoCardWrapper>
          <ApartmentInfoCard isMap={true} apartment={apartment} />
        </ApartmentInfoCardWrapper>
      </MapApartmentItem>
    );
  };
  console.log(apartmentsDisplayed);
  return (
    <>
      <Header>
        <IconButton
          backgroundColor={theme.colors.bg.secondary}
          onPress={() => navigation.goBack()}
          iconName="chevron-back-outline"
          iconColor={theme.colors.ui.primary}
        />
        <Spacer position="top" size={"medium"}></Spacer>
        <Search />
      </Header>
      <Map ref={_map} region={initialRegion}>
        {apartmentsDisplayed &&
          apartments.map((apartment) => {
            return (
              <Marker
                key={apartment.name}
                title={apartment.name}
                onPress={() => onMarkerPress(apartment.id)}
                coordinate={{
                  latitude: apartment.geometry.location.lat,
                  longitude: apartment.geometry.location.lng,
                }}
              >
                <CustomMarker image={apartment.photos[0]} />
              </Marker>
            );
          })}
      </Map>
      {apartmentsDisplayed && (
        <MapApartmentCardsWrapper>
          <MapApartmentCards
            ref={flatlistRef}
            initialNumToRender={apartmentsDisplayed.length}
            data={apartmentsDisplayed}
            pagingEnabled
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToInterval={OUTER_CARD_WIDTH}
            decelerationRate="normal"
            snapToAlignment="center"
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true, listener: onScroll }
            )}
            horizontal={true}
            renderItem={renderApartmentItem}
            keyExtractor={(_, i) => `Apartment-${i}`}
          />
        </MapApartmentCardsWrapper>
      )}
    </>
  );
};
