import React, { memo, useCallback, useContext, useEffect, useRef } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { PostStackNavigatorParamList } from "../../../types/post";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Input } from "../../../components/input/input.component";
import { useState } from "react";
import { Chip } from "../../../components/chip/chip.component";
import { ScrollView } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { CustomMarker } from "../../../features/map/components/custom-marker.component";
import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { LocationContext } from "../../../services/location/location.context";
import { Ionicons } from "@expo/vector-icons";
import GridView from "react-native-draggable-gridview";
import _ from "lodash";
import { Animated } from "react-native";
import { OUTER_CARD_WIDTH } from "../../../utils/constants";
import {
  Header,
  SectionTitle,
  SectionType,
  TypesWrapper,
  SectionCategory,
  ChipsWrapper,
  SectionLocation,
  LocationAddressWrapper,
  MapLocationWrapper,
  Map,
  CustomMarkerWrapper,
  SectionPhotos,
  PhotosGridWrapper,
  PhotoWrapper,
  Photo,
  LockedItemWrapper,
  GridItem,
  DeleteButton,
  SectionPrice,
  SectionFeatures,
  FeaturesList,
  SectionRooms,
  SectionFacility,
  ApplyButtonWrapper,
} from "../components/post.styles";
import MapView from "react-native-maps";
import { CounterRow } from "../components/counter-row.component";
import { Button } from "../../../components/button/button.component";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  featuresListMock,
  apartmentCategories,
  facilitiesList,
} from "../../../../mockData";
type Props = NativeStackScreenProps<PostStackNavigatorParamList, "Post">;

export const PostScreen = ({ navigation }: Props) => {
  const mapRef = useRef<MapView | null>(null);
  const { apartments } = useContext(ApartmentsContext);
  const apartment = apartments[0];
  const [latDelta, setLatDelta] = useState(0);
  const [featuresList, setFeaturesList] = useState(featuresListMock);
  const [totalRooms, setTotalRooms] = useState(1);
  const animatedValue: Animated.Value = new Animated.Value(0);

  const [photos, setPhotos] = useState([
    {
      name: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
      key: "one",
    },
    {
      name: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
      key: "two",
    },
    {
      name: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
      key: "three",
    },
  ]);

  const [title, setTitle] = useState("");
  const [isDisableScrollView, setIsDisableScrollView] = useState(false);
  const [region, setRegion] = useState({});
  const [price, setPrice] = useState("");
  const [editing, setEditing] = useState(false);
  const [displayedAddress, setDisplayedAddress] = useState(
    "Jl. Gerungsari, Bulusan, Kec. Tembalang, Kota Semarang, Jawa Tengah 50277"
  );
  const { location } = useContext(LocationContext);
  const { lat, lng, viewport } = location!;
  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);
  const getAddress = (e) => {
    if (mapRef) {
      mapRef
        ?.current!.addressForCoordinate(e)
        .then((address) => {
          setDisplayedAddress(address.name);
          console.log("address", address);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const LockedItem = memo(({ editing, onPress }) => (
    <LockedItemWrapper activeOpacity={editing ? 1 : 0.5} onPress={onPress}>
      <Ionicons
        size={40}
        color={theme.colors.text.primary}
        name={"add-outline"}
      ></Ionicons>
    </LockedItemWrapper>
  ));
  const renderLockedItem = useCallback(
    () => <LockedItem editing={editing} onPress={onPressAdd} />,
    [editing, photos]
  );

  const locked = useCallback((item) => item == "+", []);

  const onBeginDragging = useCallback(() => {
    !editing && setEditing(true);
    setIsDisableScrollView(true);
  }, [editing]);

  const onPressCell = useCallback(
    (item) => !editing && alert(item.color),
    [editing]
  );

  const onPressAdd = useCallback(() => console.log("press"), [editing, photos]);

  const onReleaseCell = useCallback(
    (items: any[]) => {
      const photos1 = items.slice(0, -1);
      if (!_.isEqual(photos, photos1)) setPhotos(photos1);
      setIsDisableScrollView(false);
    },
    [photos]
  );

  const onPressDelete = useCallback(
    (item) => setPhotos(photos.filter((v) => v.key != item.key)),
    [photos]
  );
  const onPressEdit = useCallback(() => {
    setEditing(!editing);
  }, [editing]);
  const renderItem = useCallback(
    (item) => {
      return (
        <GridItem>
          <PhotoWrapper>
            <Photo resizeMode="cover" source={{ uri: item.name }}></Photo>
          </PhotoWrapper>
          <DeleteButton onPress={(item) => onPressDelete(item)}>
            <Ionicons
              size={20}
              color={theme.colors.text.inverse}
              name={"close-outline"}
            ></Ionicons>
          </DeleteButton>
        </GridItem>
      );
    },
    [editing, photos]
  );
  const onPressCounter = (operation, type) => {
    const newFeatures = featuresList.map((el) => {
      if (el.type != type) {
        return el;
      }
      if (operation == "plus") {
        el.quantity++;
        return el;
      }
      el.quantity--;
      return el;
    });
    setFeaturesList(newFeatures);
  };
  const photoPicker = ()=> {
    launch
  }
  return (
    <SafeArea>
      <Header>
        <IconButton onPress={() => navigation.goBack()} />
        <Text variant="title">Property</Text>
        <Spacer position="right" size="xl" />
      </Header>
      <ScrollView scrollEnabled={!isDisableScrollView}>
        <SectionTitle>
          <Text variant="title">Listing Title</Text>
          <Spacer position="top" size="large" />
          <Input
            placeholder="Flat with awesome view of the city"
            value={title}
            setValue={setTitle}
          />
        </SectionTitle>
        <SectionType>
          <Text variant="title">Listing Title</Text>
          <Spacer position="top" size="large" />
          <TypesWrapper>
            <Chip size="large" isSelected={true} title="Rent" />
            <Spacer position="right" size="medium" />
            <Chip size="large" isSelected={false} title="Sell" />
          </TypesWrapper>
        </SectionType>
        <SectionCategory>
          <Text variant="title">Property category</Text>
          <Spacer position="top" size="large" />
          <ChipsWrapper>
            {apartmentCategories.map((el) => (
              <Spacer position="right" size="medium">
                               <Spacer position="top" size="medium"></Spacer>
                <Chip
                  size="large"
                  isButton={true}
                  isSelected={false}
                  title={el.category.name}
                />
              </Spacer>
            ))}
          </ChipsWrapper>
        </SectionCategory>
        <SectionLocation>
          <Text variant="title">Location</Text>
          <LocationAddressWrapper>
            <IconButton
              onPress={() => null}
              iconName="location-outline"
              iconColor={theme.colors.ui.primary}
            />
            <Spacer position="left" size="medium">
              <Text color={theme.colors.text.muted} variant="body">
                {displayedAddress}
              </Text>
            </Spacer>
          </LocationAddressWrapper>
          <Spacer position="top" size="large" />
          <MapLocationWrapper
            onPress={() =>
              navigation.navigate("Map", { selectedApartment: apartment })
            }
          >
            <Map
              ref={mapRef}
              userInterfaceStyle={"light"}
              region={{
                latitude: apartment.geometry.location.lat,
                longitudeDelta: 0.01,
                latitudeDelta: latDelta,
                longitude: apartment.geometry.location.lng,
              }}
              onRegionChangeComplete={(data) => {
                getAddress(data);
                setRegion(data);
              }}
            ></Map>
            <CustomMarkerWrapper>
              <CustomMarker image={apartment.photos[0]} />
            </CustomMarkerWrapper>
          </MapLocationWrapper>
        </SectionLocation>
        <SectionPhotos>
          <Text variant="title">Listing Photos</Text>
          <Spacer position="top" size="large" />
          <PhotosGridWrapper>
            <GridView
              width={OUTER_CARD_WIDTH * 0.9}
              style={{ flex: 1, width: "100%" }}
              data={[...photos, "+"]}
              keyExtractor={(item) => (item == "+" ? item : item.key)}
              renderItem={renderItem}
              renderLockedItem={renderLockedItem}
              locked={locked}
              onBeginDragging={onBeginDragging}
              onPressCell={onPressCell}
              onReleaseCell={onReleaseCell}
              numColumns={2}
              delayLongPress={50}
            />
          </PhotosGridWrapper>
        </SectionPhotos>
        <SectionPrice>
          <Text variant="title">Rent Price</Text>
          <Spacer position="top" size="large" />
          <Input
            setValue={setPrice}
            value={`${price}`}
            iconName="ios-logo-euro"
            placeholder="price per month"
            keyboardType="numeric"
          />
        </SectionPrice>
        <SectionFeatures>
          <Text variant="title">Property Features</Text>
          <Spacer position="top" size="large" />

          <FeaturesList>
            {featuresList.map((feature) => (
              <Spacer key={feature.type} position="bottom" size={"large"}>
                <CounterRow
                  label={feature.type}
                  value={feature.quantity}
                  onIncrease={(type) => {
                    onPressCounter("plus", type);
                  }}
                  onDecrease={(type) => {
                    if (feature.quantity <= 0) {
                      return null;
                    }
                    onPressCounter("minus", type);
                  }}
                ></CounterRow>
              </Spacer>
            ))}
          </FeaturesList>
        </SectionFeatures>
        <SectionRooms>
          <Text variant="title">Total Rooms</Text>
          <Spacer position="top" size="large" />
          <Spacer position="bottom" size={"large"}>
            <CounterRow
              label={"Total Rooms"}
              value={totalRooms}
              onIncrease={() => {
                setTotalRooms(totalRooms + 1);
              }}
              onDecrease={() => {
                if (totalRooms <= 0) {
                  return null;
                }
                setTotalRooms(totalRooms - 1);
              }}
            ></CounterRow>
          </Spacer>
        </SectionRooms>
        <SectionFacility>
          <Text variant="title">Total Rooms</Text>
          <Spacer position="top" size="large" />
          <ChipsWrapper>
            {facilitiesList.map((el) => (
              <Spacer key={el.key} position="right" size="medium">
                <Spacer position="top" size="medium"></Spacer>
                <Chip
                  size="large"
                  isButton={true}
                  isSelected={false}
                  title={el.category.name}
                />
              </Spacer>
            ))}
          </ChipsWrapper>
        </SectionFacility>
        <ApplyButtonWrapper>
          <Button onPress={() => null} title={"Upload"}></Button>
        </ApplyButtonWrapper>
      </ScrollView>
    </SafeArea>
  );
};
