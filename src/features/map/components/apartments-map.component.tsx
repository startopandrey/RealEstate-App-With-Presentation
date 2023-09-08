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
  HeaderButtons,
  SearchText,
  SearchTextWrapper,
} from "./apartments-map.styles";
import MapView, { Marker } from "react-native-maps";
import { FlatList } from "react-native";
import { onScroll } from "../helpers";
import { MapFilter } from "./map-filter.component";

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

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [latDelta, setLatDelta] = useState<number>(0);
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
  const _map = useRef<MapView | null>(null);
  const flatlistRef = useRef<FlatList>(null);
  const mapIndex = useRef(0);
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  const { latitude, longitude, viewport } = location!;

  useEffect(() => {
    const { latitude, longitude } = location!;
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
    setInitialRegion({
      latitude: latitude,
      longitudeDelta: 0.01,
      latitudeDelta: latDelta,
      longitude: longitude,
    });
  }, [location]);

  const mapScrollToIndex = (index: number) => {
    flatlistRef.current?.scrollToIndex({
      index: index,
      animated: true,
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
  // useEffect(() => {
  //   if (!apartments[0]) {
  //     return;
  //   }
  //   const resetInitialRegion = (apartment: Apartment) => {
  //     setInitialRegion({
  //       latitude: apartment.geometry.location.lat,
  //       longitudeDelta: 0.01,
  //       latitudeDelta: latDelta,
  //       longitude: apartment.geometry.location.lng,
  //     });
  //   };
  //   if (!selectedApartment) {
  //     resetInitialRegion(apartments[0]);
  //     return;
  //   }
  //   return resetInitialRegion(selectedApartment);
  // }, [latitude, longitude, viewport, latDelta, selectedApartment, apartments]);
  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  const onMarkerPress = (id: string) => {
    const apartmentIndexById = apartmentsDisplayed.findIndex(
      (item) => item.id === id
    );
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
        <HeaderButtons>
          <IconButton
            backgroundColor={theme.colors.bg.secondary}
            onPress={() => navigation.goBack()}
            iconName="chevron-back-outline"
            iconColor={theme.colors.ui.primary}
          />
          <SearchTextWrapper>
            <SearchText variant="title">Search results</SearchText>
          </SearchTextWrapper>
          <IconButton
            backgroundColor={theme.colors.bg.secondary}
            onPress={() => setIsOpenFilter(true)}
            iconName="options-outline"
            iconColor={theme.colors.ui.primary}
          />
        </HeaderButtons>

        <Spacer position="top" size={"medium"} />
        <Search />
      </Header>
      <Map ref={_map} userInterfaceStyle={"light"} region={initialRegion}>
        {apartmentsDisplayed &&
          apartments.map((apartment: Apartment) => {
            const apartmentPhoto =
              apartment.photos[0]?.photoUrl ??
              "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg";
            return (
              <Marker
                key={apartment.id}
                title={apartment.name}
                onPress={() => onMarkerPress(apartment.id)}
                coordinate={{
                  latitude: apartment.location.latitude,
                  longitude: apartment.location.longitude,
                }}
              >
                <CustomMarker image={apartmentPhoto} />
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
            keyExtractor={(item: any): string => item._id.toString()}
          />
        </MapApartmentCardsWrapper>
      )}

      <MapFilter setIsOpen={setIsOpenFilter} isOpen={isOpenFilter} />
    </>
  );
};
