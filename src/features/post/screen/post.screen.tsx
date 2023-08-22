import React, { memo, useCallback, useEffect, useRef } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { PhotoType, PostStackNavigatorParamList } from "../../../types/post";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Input } from "../../../components/input/input.component";
import { useState } from "react";
import { Chip } from "../../../components/chip/chip.component";
import { FlatList, ScrollView } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { CustomMarker } from "../../../features/map/components/custom-marker.component";
import { Ionicons } from "@expo/vector-icons";
import GridView from "react-native-draggable-gridview";
import _ from "lodash";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  OUTER_CARD_WIDTH,
  initialRegion,
} from "../../../utils/constants";
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
  SectionRooms,
  SectionFacility,
  ApplyButtonWrapper,
  SectionDescription,
  HeaderPhotos,
  Address,
} from "../components/post.styles";
import MapView from "react-native-maps";
import { CounterRow } from "../components/counter-row.component";
import { Button } from "../../../components/button/button.component";
import {
  featuresListMock,
  apartmentCategories,
  facilitiesList,
} from "../../../../mockData";
import {
  getCurrentUserLoction,
  isLocationPermission,
} from "../../../services/helpers/location.helper";
import {
  isGalleryPermission,
  pickGalleryImage,
} from "../../../services/helpers/photo.helper";
import { MapLocationType } from "../../../types/location";
type Props = NativeStackScreenProps<PostStackNavigatorParamList, "Post">;

export const PostScreen = ({ navigation }: Props): React.JSX.Element => {
  const mapRef = useRef<MapView | null>(null);

  const [featuresList, setFeaturesList] = useState(featuresListMock);
  const [totalRooms, setTotalRooms] = useState<number>(1);

  const [photos, setPhotos] = useState<PhotoType[] | null>(null);
  const photosLength = photos ? photos.length : 0;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isDisableScrollView, setIsDisableScrollView] = useState(false);
  const [region, setRegion] = useState<MapLocationType>(initialRegion);
  const [price, setPrice] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [displayedAddress, setDisplayedAddress] =
    useState<string>("Property Address");
  const [isPermissionsAccepted, setIsPermissionsAccepted] =
    useState<boolean>(false);

  const getPermissions = async () => {
    const isGalleryAccepted = await isGalleryPermission();
    const isLocationPermissionAccepted = await isLocationPermission();

    if (isGalleryAccepted && isLocationPermissionAccepted) {
      setIsPermissionsAccepted(true);
      return;
    }
    setIsPermissionsAccepted(false);
    return;
  };
  const getAddressFromCoords = (e) => {
    if (mapRef) {
      mapRef?.current
        ?.addressForCoordinate(e)
        .then((address) => {
          setDisplayedAddress(
            `${address.country}, ${address.locality}, ${address.name}`
          );
          console.log("address", address);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const generateLocationObject = (
    latitude: number,
    longitude: number
  ): MapLocationType => {
    return {
      latitude: latitude,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA,
      longitude: longitude,
    };
  };
  const getCurrentLocation = async () => {
    if (region.latitude !== 0) {
      return;
    }
    const location = await getCurrentUserLoction();
    if (location) {
      setRegion(
        generateLocationObject(
          location?.coords?.latitude,
          location?.coords?.longitude
        )
      );
      getAddressFromCoords(
        generateLocationObject(
          location?.coords?.latitude,
          location?.coords?.longitude
        )
      );
    }
  };
  const updatePhotos = (photoUri: string) => {
    if (photos) {
      setPhotos([...photos, { key: `${photosLength + 1}`, uri: photoUri }]);
      return
    }
    setPhotos([{ key: `${1}`, uri: photoUri }]);
  };
  const pickImage = async () => {
    const image = await pickGalleryImage();
    if (!image.canceled) {
      const imageUri = image.assets[0].uri;
      updatePhotos(imageUri);
    }
  };

  const LockedItem = memo(
    ({
      editing,
      onPress,
      disabled,
    }: {
      editing: boolean;
      onPress: () => void;
      disabled: boolean;
    }) => (
      <LockedItemWrapper
        disabled={disabled}
        activeOpacity={editing ? 1 : 0.5}
        onPress={onPress}
      >
        <Ionicons
          size={40}
          color={theme.colors.text.primary}
          name={"add-outline"}
        />
      </LockedItemWrapper>
    )
  );
  const onPressAdd = useCallback(
    () => (photosLength < 8 ? pickImage() : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photosLength]
  );
  const renderLockedItem = useCallback(
    () => (
      <LockedItem
        disabled={photosLength === 8}
        editing={editing}
        onPress={onPressAdd}
      />
    ),
    [editing, photosLength, onPressAdd]
  );

  const locked = useCallback((item: PhotoType | "+") => item === "+", []);

  const onBeginDragging = useCallback(() => {
    !editing && setEditing(true);
    setIsDisableScrollView(true);
  }, [editing]);

  const onReleaseCell = useCallback(
    (items: PhotoType[]) => {
      const photos1 = items.slice(1);
      console.log(photos1);
      if (!_.isEqual(photos, photos1)) {
        setPhotos(photos1);
      }
      setIsDisableScrollView(false);
    },
    [photos]
  );

  const onPressDelete = useCallback(
    (item) => {
      if (item == "+" || !photos) {
        return;
      }
      setPhotos(photos.filter((v) => v.key !== item.key));
    },
    [photos]
  );
  useEffect(() => {
    if (!isPermissionsAccepted) {
      getPermissions();
    }
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(
    (item: PhotoType) => {
      return (
        <GridItem>
          <PhotoWrapper>
            <Photo resizeMode="cover" source={{ uri: item.uri }} />
          </PhotoWrapper>
          <DeleteButton onPress={() => onPressDelete(item)}>
            <Ionicons
              size={20}
              color={theme.colors.text.inverse}
              name={"close-outline"}
            />
          </DeleteButton>
        </GridItem>
      );
    },
    [onPressDelete]
  );
  const onPressCounter = (operation, type) => {
    const newFeatures = featuresList.map((el) => {
      if (el.type !== type) {
        return el;
      }
      if (operation === "plus") {
        el.quantity++;
        return el;
      }
      el.quantity--;
      return el;
    });

    setFeaturesList(newFeatures);
  };

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
            placeholder="Bungalow House 1 room with ..."
            value={title}
            setValue={setTitle}
          />
        </SectionTitle>
        <SectionDescription>
          <Text variant="title">Listing Description</Text>
          <Spacer position="top" size="large" />
          <Input
            placeholder="Perfect holiday house with pool ..."
            value={description}
            setValue={setDescription}
            multiline={true}
            textSize="medium"
          />
        </SectionDescription>
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
                <Spacer position="top" size="medium" />
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
              <Address color={theme.colors.text.muted} variant="body">
                {displayedAddress}
              </Address>
            </Spacer>
          </LocationAddressWrapper>
          <Spacer position="top" size="large" />
          <MapLocationWrapper>
            <Map
              ref={mapRef}
              userInterfaceStyle={"light"}
              region={region}
              zoomEnabled={true}
              onRegionChangeComplete={(data) => {
                console.log(data);
                getAddressFromCoords(data);
                setRegion(data);
              }}
            />
            <CustomMarkerWrapper>
              <CustomMarker image={photos && photos[0]?.uri} />
            </CustomMarkerWrapper>
          </MapLocationWrapper>
        </SectionLocation>
        <SectionPhotos>
          <HeaderPhotos>
            <Text variant="title">Listing Photos</Text>
            <Text variant="title">{`${photosLength} / 8`}</Text>
          </HeaderPhotos>
          <Spacer position="top" size="large" />
          <PhotosGridWrapper>
            <GridView
              width={OUTER_CARD_WIDTH * 0.9}
              style={{ flex: 1, width: "100%" }}
              data={photos ? ["+", ...photos] : ["+"]}
              keyExtractor={(item) => (item === "+" ? item : item.key)}
              renderItem={renderItem}
              renderLockedItem={renderLockedItem}
              locked={locked}
              onBeginDragging={onBeginDragging}
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

          <FlatList
            data={featuresList}
            keyExtractor={(item) => item.type ?? "12"}
            renderItem={({ item }) => (
              <Spacer
                // key={`${feature.type}-${i}`}
                position="bottom"
                size={"large"}
              >
                <CounterRow
                  label={item.type}
                  value={item.quantity}
                  onIncrease={(type) => {
                    onPressCounter("plus", type);
                  }}
                  onDecrease={(type) => {
                    if (item.quantity <= 0) {
                      return null;
                    }
                    onPressCounter("minus", type);
                  }}
                />
              </Spacer>
            )}
          />
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
                if (totalRooms <= 1) {
                  return null;
                }
                setTotalRooms(totalRooms - 1);
              }}
            />
          </Spacer>
        </SectionRooms>
        <SectionFacility>
          <Text variant="title">Total Rooms</Text>
          <Spacer position="top" size="large" />
          <ChipsWrapper>
            {facilitiesList.map((el) => (
              <Spacer key={el.key} position="right" size="medium">
                <Spacer position="top" size="medium" />
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
          <Button onPress={() => null} title={"Upload"} />
        </ApplyButtonWrapper>
      </ScrollView>
    </SafeArea>
  );
};
