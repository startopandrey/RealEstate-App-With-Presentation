import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import { LocationContext } from "../../../services/location/location.context";
import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { Search } from "../components/search.component";
import { CustomMarker } from "../components/custom-marker.component";
import { ApartmentInfoCard } from "../../../features/apartments/components/apartment-info-card.component";
import { OUTER_CARD_WIDTH } from "../../../utils/constants";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { theme } from "../../../infrastructure/theme";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Apartment } from "../../../types/apartments/apartment";
import {
  MapApartmentItem,
  ApartmentInfoCardWrapper,
  Header,
  MapApartmentCardsWrapper,
  Map,
  MapApartmentCards,
} from "./apartments-map.styles";
import { Marker } from "react-native-maps";
import { FlatList } from "react-native";
import { onScroll } from "../helpers";

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
  const _map = useRef<FlatList<InitialRegionType>>(null);
  const flatlistRef = useRef<FlatList>(null);
  const mapIndex = useRef(0);
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  const { lat, lng, viewport } = location!;

  const mapScrollToIndex = (index: number) => {
    flatlistRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };
  const resetInitialRegion = (apartment: Apartment) => {
    setInitialRegion({
      latitude: apartment.geometry.location.lat,
      longitudeDelta: 0.01,
      latitudeDelta: latDelta,
      longitude: apartment.geometry.location.lng,
    });
  };
  const onScrollApartmentList = (e) => {
    onScroll(e, mapIndex, _map, apartmentsDisplayed, latDelta);
  };
  useEffect(() => {
    if (selectedApartment && apartmentsDisplayed) {
      mapScrollToIndex(0);
    }
  }, [selectedApartment, apartmentsDisplayed]);

  useEffect(() => {
    if (!selectedApartment) {
      setApartmentsDisplayed([...apartments]);
      return;
    }
    const filteredApartments = apartments.filter(
      (el) => el.id !== selectedApartment.id
    );
    setApartmentsDisplayed([selectedApartment, ...filteredApartments]);
  }, [apartments, selectedApartment, selectedApartment?.id]);
  useEffect(() => {
    if (!selectedApartment) {
      resetInitialRegion(apartments[0]);

      return;
    }

    return resetInitialRegion(selectedApartment);
    
  }, [lat, lng, viewport, latDelta, selectedApartment, apartments]);
  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  const onMarkerPress = (id: string) => {
    const apartmentIndexById = apartmentsDisplayed.findIndex(
      (item) => item.id === id
    );
    // In this case we dont need to animate to region, it happens by default
    mapIndex.current = apartmentIndexById;
    mapScrollToIndex(apartmentIndexById);
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

  return (
    <>
      <Header>
        <IconButton
          backgroundColor={theme.colors.bg.secondary}
          onPress={() => navigation.goBack()}
          iconName="chevron-back-outline"
          iconColor={theme.colors.ui.primary}
        />
        <Spacer position="top" size={"medium"} />
        <Search />
      </Header>
      <Map ref={_map} userInterfaceStyle={"light"} region={initialRegion}>
        {apartmentsDisplayed &&
          apartments.map((apartment: Apartment) => {
            return (
              <Marker
                key={apartment.id}
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
            extraData={apartmentsDisplayed}
            // onViewableItemsChanged={onViewCallBack}
            // viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
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
              { useNativeDriver: true, listener: onScrollApartmentList }
            )}
            horizontal={true}
            renderItem={renderApartmentItem}
            keyExtractor={(item: Apartment): string => item.id.toString()}
          />
        </MapApartmentCardsWrapper>
      )}
    </>
  );
};
