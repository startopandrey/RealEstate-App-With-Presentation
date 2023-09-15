import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import { LocationContext } from "../../../services/location/location.context";
import { ApartmentsContext } from "../../../services/apartments/apartments.context";

import { CustomMarker } from "../components/custom-marker.component";
import { ApartmentInfoCard } from "../../../features/apartments/components/apartment-info-card.component";
import { LATITUDE_DELTA, OUTER_CARD_WIDTH } from "../../../utils/constants";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { theme } from "../../../infrastructure/theme";
import { Spacer } from "@src/components/spacer/spacer.component";
import { Apartment, NewApartment } from "@src/types/apartments/apartment";
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
  SearchWrapper,
} from "./apartments-map.styles";
import MapView, { Marker } from "react-native-maps";
import { FlatList } from "react-native";
import { onScroll } from "../helpers";
import { MapFilter } from "./map-filter.component";
import {
  CENTER_OFFSET,
  MARKER_ANCHOR,
} from "../../../services/helpers/location.helper";
import { Search } from "../../../features/apartments/components/search.component";

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
  const selectedApartment: NewApartment = route.params?.selectedApartment;

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<InitialRegionType>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: 0.01,
  });
  const [apartmentsDisplayed, setApartmentsDisplayed] = useState<
    NewApartment[] | null
  >([]);
  // contexts
  const { apartments } = useContext(ApartmentsContext);
  const { location } = useContext(LocationContext);
  //refs
  const _map = useRef<MapView | null>(null);
  const flatlistRef = useRef<FlatList>(null);
  const mapIndex = useRef(0);
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const { latitude, longitude } = location!;
    setInitialRegion({
      latitude: latitude,
      longitudeDelta: 0.01,
      latitudeDelta: LATITUDE_DELTA,
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
    onScroll(e, mapIndex, _map, apartmentsDisplayed, LATITUDE_DELTA);
  };
  // useEffect(() => {
  //   console.log(selectedApartment, apartmentsDisplayed);
  //   if (selectedApartment && apartmentsDisplayed) {
  //     mapScrollToIndex(0);
  //   }
  // }, [selectedApartment, apartmentsDisplayed]);

  useEffect(() => {
    if (!selectedApartment) {
      setApartmentsDisplayed([...apartments]);
      return;
    }
    const filteredApartments = apartments.filter(
      (el) => el._id !== selectedApartment._id
    );
    setApartmentsDisplayed([selectedApartment, ...filteredApartments]);
    if (apartmentsDisplayed?.length) {
      mapScrollToIndex(0);
    }
  }, [apartments, selectedApartment, selectedApartment?._id]);

  useEffect(() => {
    if (!apartments) {
      return;
    }

    const resetInitialRegion = (apartment: NewApartment) => {
      console.log(apartment?.location, "locf");
      if (apartment?.location) {
        setInitialRegion({
          latitude: apartment.location.latitude,
          longitudeDelta: 0.01,
          latitudeDelta: LATITUDE_DELTA,
          longitude: apartment.location.longitude,
        });
      }
    };

    if (!selectedApartment) {
      resetInitialRegion(apartments[0]);
      return;
    }

    return resetInitialRegion(selectedApartment);
  }, [selectedApartment, apartments]);
  const onMarkerPress = (id: string) => {
    if (!apartmentsDisplayed) {
      return;
    }
    const apartmentIndexById = apartmentsDisplayed.findIndex(
      (item) => item._id === id
    );
    mapIndex.current = apartmentIndexById;
    mapScrollToIndex(apartmentIndexById);
  };
  const renderApartmentItem = ({ item }): React.ReactElement => {
    const apartment: NewApartment = item;
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
            go_back_key: `${apartment._id}-map`,
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
  console.log(apartmentsDisplayed, "hol");
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
        <SearchWrapper>
          <Search></Search>
        </SearchWrapper>
      </Header>
      <Map ref={_map} userInterfaceStyle={"light"} region={initialRegion}>
        {apartmentsDisplayed &&
          apartments.map((apartment: NewApartment) => {
            const apartmentPhoto =
              apartment.photos[0]?.url ??
              "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg";
            return (
              <Marker
                anchor={MARKER_ANCHOR}
                tracksViewChanges={false}
                centerOffset={CENTER_OFFSET}
                key={apartment._id}
                flat
                title={apartment.title}
                onPress={() => onMarkerPress(apartment._id)}
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
