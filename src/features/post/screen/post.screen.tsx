import React, {
  memo,
  useCallback,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { PhotoType, PostStackNavigatorParamList } from "../../../types/post";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Input } from "../../../components/input/input.component";
import axios from "axios";
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
  LockedItemWrapper,
  GridItem,
  DeleteButton,
  SectionNumberInput,
  SectionFeatures,
  SectionRooms,
  SectionFacility,
  ApplyButtonWrapper,
  SectionDescription,
  HeaderPhotos,
  Address,
  Photo,
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
import {
  ApartmentPhoto,
  Facility,
  NewApartment,
} from "../../../types/apartments/apartment";
// import useState from "react-usestateref";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";
type Props = NativeStackScreenProps<PostStackNavigatorParamList, "Post">;

export const PostScreen = ({ navigation }: Props): React.JSX.Element => {
  const mapRef = useRef<MapView | null>(null);

  const [featuresList, setFeaturesList] = useState(featuresListMock);

  const [isDisableScrollView, setIsDisableScrollView] = useState(false);
  const [region, setRegion] = useState<MapLocationType>(initialRegion);

  const [editing, setEditing] = useState<boolean>(false);

  const [isPermissionsAccepted, setIsPermissionsAccepted] =
    useState<boolean>(false);
  const [createdApartment, setCreatedApartment] = useState<NewApartment>({
    geometry: {
      location: initialRegion,
    },
    category: null,
    price: "",
    address: "Property Address",
    title: "",
    description: "",
    squareMeter: "",
    bedrooms: 1,
    bathrooms: 1,
    photos: [],
    authorId: "",
    totalRooms: 1,
    facilities: [],
  });
  const photos = createdApartment.photos;
  const photosLength = photos ? photos.length : 0;

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
          setCreatedApartment({
            ...createdApartment,
            address: `${address.country}, ${address.locality}, ${address.name}`,
          });
          console.log("address", address);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const generateLocationObject = (
    latitude: number,
    longitude: number,
    longitudeDelta: number,
    latitudeDelta: number
  ): MapLocationType => {
    return {
      latitude: latitude,
      longitudeDelta: longitudeDelta,
      latitudeDelta: latitudeDelta,
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
          location?.coords?.longitude,
          LONGITUDE_DELTA,
          LATITUDE_DELTA
        )
      );
      getAddressFromCoords(
        generateLocationObject(
          location?.coords?.latitude,
          location?.coords?.longitude,
          LONGITUDE_DELTA,
          LATITUDE_DELTA
        )
      );
    }
  };
  const updatePhotos = (photoUri: string) => {
    console.log(photoUri);
    const newPhoto = {
      key: `${photos?.length === 0 ? 0 : photos?.length + 1}`,
      photoUrl: photoUri,
    };
    if (photos) {
      setCreatedApartment({
        ...createdApartment,
        photos: photosLength ? [...photos, newPhoto] : [newPhoto],
      });
      return;
    }
    setCreatedApartment({
      ...createdApartment,
      photos: [newPhoto],
    });
  };
  const handleUpdata = async ({
    imageUri,
    type,
    name,
  }: {
    imageUri: string;
    type: string;
    name: string;
  }) => {
    const formData = new FormData();
    formData.append("profile", {
      name: name,
      type: type,
      uri: imageUri,
    });
    // const res = await axios.post(
    //   "http://192.168.0.9:7777/apartment/create",
    //   formData,
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );

    // console.log(res.data);
  };

  const pickImage = async () => {
    const imageResponse = await pickGalleryImage();
    if (!imageResponse.assets || imageResponse.canceled) {
      return;
    }
    const image = imageResponse?.assets[0];
    if (image.uri) {
      const imageUri = image.uri;
      const type = `image/${imageUri.split(".")[1]}`;
      const name = image.fileName ?? "image";
      const source = { imageUri, type, name };
      handleUpdata(source);
      updatePhotos(imageUri);
      // console.log(source)
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

  const locked = useCallback((item: ApartmentPhoto | "+") => item === "+", []);

  const onBeginDragging = useCallback(() => {
    !editing && setEditing(true);
    setIsDisableScrollView(true);
  }, [editing]);

  const onReleaseCell = useCallback(
    (items: ApartmentPhoto[]) => {
      const photos1 = items.slice(1);
      console.log(photos1);
      if (!_.isEqual(photos, photos1)) {
        setCreatedApartment({ ...createdApartment, photos: photos1 });
      }
      setIsDisableScrollView(false);
    },
    [photos, createdApartment]
  );

  const onPressDelete = useCallback(
    (item) => {
      if (item === "+" || !photos) {
        return;
      }
      setCreatedApartment({
        ...createdApartment,
        photos: photos.filter((v) => v.key !== item.key),
      });
    },
    [photos, createdApartment]
  );

  const renderItem = useCallback(
    (item) => {
      return (
        <GridItem>
          <PhotoWrapper>
            <Photo resizeMode="cover" source={{ uri: item.photoUrl }} />
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
  const onPressFacility = (
    facility: Facility,
    selectedFacility: Facility | undefined
  ) => {
    if (
      !createdApartment.facilities ||
      !selectedFacility ||
      selectedFacility.id !== facility.id
    ) {
      const newFacilities = createdApartment.facilities
        ? [...createdApartment.facilities, facility]
        : [facility];
      setCreatedApartment({
        ...createdApartment,
        facilities: newFacilities,
      });
      return;
    }
    const newFacilities = createdApartment.facilities.filter(
      (el) => el.id !== selectedFacility.id
    );

    setCreatedApartment({
      ...createdApartment,
      facilities: newFacilities,
    });
  };

  useEffect(() => {
    if (!isPermissionsAccepted) {
      getPermissions();
    }
    console.log("cur");
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            value={createdApartment.title}
            setValue={(state) =>
              setCreatedApartment({ ...createdApartment, title: state })
            }
          />
        </SectionTitle>
        <SectionDescription>
          <Text variant="title">Listing Description</Text>
          <Spacer position="top" size="large" />
          <Input
            placeholder="Perfect holiday house with pool ..."
            value={createdApartment.description}
            setValue={(state) =>
              setCreatedApartment({ ...createdApartment, description: state })
            }
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
            {apartmentCategories.map((el) => {
              const category = el.category;
              const isSelected = category.id === createdApartment?.category?.id;
              return (
                <Spacer position="right" size="medium">
                  <Spacer position="top" size="medium" />
                  <Chip
                    size="large"
                    isButton={true}
                    onPress={() =>
                      setCreatedApartment({
                        ...createdApartment,
                        category: category,
                      })
                    }
                    isSelected={!!isSelected}
                    title={category.name}
                  />
                </Spacer>
              );
            })}
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
                {createdApartment.address}
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
                console.log("122", data);
                getAddressFromCoords(data);
                // setCreatedApartment({
                //   ...createdApartment,
                //   geometry: {
                //     ...createdApartment.geometry,
                //     location: data,
                //   },
                // });
                setRegion(data);
              }}
            />
            <CustomMarkerWrapper>
              <CustomMarker image={photos && photos[0]?.photoUrl} />
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
              data={
                createdApartment?.photos
                  ? ["+", ...createdApartment?.photos]
                  : ["+"]
              }
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
        <SectionNumberInput>
          <Text variant="title">Rent Price</Text>
          <Spacer position="top" size="large" />
          <Input
            value={createdApartment.price}
            setValue={(state) =>
              setCreatedApartment({ ...createdApartment, price: state })
            }
            iconName="ios-logo-euro"
            placeholder="price per month"
            keyboardType="numeric"
          />
        </SectionNumberInput>
        <SectionNumberInput>
          <Text variant="title">Square Meter</Text>
          <Spacer position="top" size="large" />
          <Input
            value={createdApartment.squareMeter}
            setValue={(state) =>
              setCreatedApartment({ ...createdApartment, squareMeter: state })
            }
            iconName="cube-outline"
            placeholder="property meters"
            keyboardType="numeric"
          />
        </SectionNumberInput>
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
              value={createdApartment.totalRooms}
              onIncrease={() => {
                setCreatedApartment({
                  ...createdApartment,
                  totalRooms: createdApartment.totalRooms + 1,
                });
              }}
              onDecrease={() => {
                if (createdApartment.totalRooms <= 1) {
                  return null;
                }
                setCreatedApartment({
                  ...createdApartment,
                  totalRooms: createdApartment.totalRooms - 1,
                });
              }}
            />
          </Spacer>
        </SectionRooms>
        <SectionFacility>
          <Text variant="title">Total Rooms</Text>
          <Spacer position="top" size="large" />
          <ChipsWrapper>
            {facilitiesList.map((el) => {
              const selectedFacility = createdApartment?.facilities?.find(
                (value) => value.name === el.category.name
              );

              return (
                <Spacer key={el.key} position="right" size="medium">
                  <Spacer position="top" size="medium" />
                  <Chip
                    onPress={() =>
                      onPressFacility(el.category, selectedFacility)
                    }
                    size="large"
                    isButton={true}
                    isSelected={!!selectedFacility}
                    title={el.category.name}
                  />
                </Spacer>
              );
            })}
          </ChipsWrapper>
        </SectionFacility>
        <ApplyButtonWrapper>
          <Button onPress={() => null} title={"Upload"} />
        </ApplyButtonWrapper>
      </ScrollView>
    </SafeArea>
  );
};
