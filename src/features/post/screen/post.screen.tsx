import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { PostStackNavigatorParamList } from "../../../types/post";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Input } from "../../../components/input/input.component";

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
  ApartmentCategory,
  ApartmentPhoto,
  Facility,
  NewApartment,
} from "../../../types/apartments/apartment";
import { postRequest } from "../../../services/post/post.service";
import { isValidApartment } from "../../../services/post/post.utils";
import { useScrollToTop } from "@react-navigation/native";
import { Alert } from "../../../components/alert/alert.component";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useFocusEffect } from "@react-navigation/native";

// import useState from "react-usestateref";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";
type Props = NativeStackScreenProps<PostStackNavigatorParamList, "Post">;

export const PostScreen = ({ navigation }: Props): React.JSX.Element => {
  const mapRef = useRef<MapView | null>(null);
  const mainRef = useRef(null);
  const [featuresList, setFeaturesList] = useState(featuresListMock);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [squareMeter, setSquareMeter] = useState("");
  const [location, setLocation] = useState<MapLocationType>(initialRegion);
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("Property Address");
  // const [authorId, setAuthorId] = useState("456");
  const [isUploaded, setIsUploaded] = useState(false);
  const [totalRooms, setTotalRooms] = useState(1);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isDisableScrollView, setIsDisableScrollView] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [category, setCategory] = useState<ApartmentCategory | null>(null);
  const [photos, setPhotos] = useState<ApartmentPhoto[]>([]);
  const [isAlert, setIsAlert] = useState(true);
  const [isPermissionsAccepted, setIsPermissionsAccepted] =
    useState<boolean>(false);
  const [createdApartment, setCreatedApartment] = useState<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const photosLength = photos ? photos.length : 0;
  console.log(createdApartment);
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
  const setStatesToDefault = () => {
    setFeaturesList(featuresListMock);
    setTitle("");
    setDescription("");
    setSquareMeter("");

    setPrice("");
    setTotalRooms(1);
    setFacilities([]);
    setIsDisableScrollView(false);
    setEditing(false);
    setCategory(null);
    setPhotos([]);
    setIsAlert(true);
    setIsPermissionsAccepted(false);
    setCreatedApartment(null);
  };
  const getAddressFromCoords = (e) => {
    if (mapRef) {
      mapRef?.current
        ?.addressForCoordinate(e)
        .then((address) => {
          setAddress(
            `${address.country}, ${address.locality}, ${address.name}`
          );
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
    if (location.latitude !== 0) {
      return;
    }
    const currentLocation = await getCurrentUserLoction();

    if (currentLocation) {
      setLocation(
        generateLocationObject(
          currentLocation?.coords?.latitude,
          currentLocation?.coords?.longitude,
          LONGITUDE_DELTA,
          LATITUDE_DELTA
        )
      );
      getAddressFromCoords(
        generateLocationObject(
          currentLocation?.coords?.latitude,
          currentLocation?.coords?.longitude,
          LONGITUDE_DELTA,
          LATITUDE_DELTA
        )
      );
    }
  };
  const updatePhotos = (photoUri: string, name: string) => {
    console.log(photoUri);
    const newPhoto: ApartmentPhoto = {
      key: `${photos?.length === 0 ? 0 : photos?.length + 1}`,
      photoUrl: photoUri,
      name: name,
    };
    if (photos) {
      setPhotos(photosLength ? [...photos, newPhoto] : [newPhoto]);
      return;
    }
    setPhotos([newPhoto]);
  };

  const pickImage = async () => {
    const imageResponse = await pickGalleryImage();
    if (!imageResponse.assets || imageResponse.canceled) {
      return;
    }
    const image = imageResponse?.assets[0];
    if (image.uri) {
      const imageUri = image.uri;
      const name = image.fileName ?? "image";
      updatePhotos(imageUri, name);
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
        setPhotos(photos1);
      }
      setIsDisableScrollView(false);
    },
    [photos]
  );

  const onPressDelete = useCallback(
    (item) => {
      if (item === "+" || !photos) {
        return;
      }
      setPhotos(photos.filter((v) => v.key !== item.key));
    },
    [photos]
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
  const closeAlert = () => {
    mainRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setIsAlert(false);
    bottomSheetRef.current?.close();
  };
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
      !facilities ||
      !selectedFacility ||
      selectedFacility.id !== facility.id
    ) {
      const newFacilities = facilities ? [...facilities, facility] : [facility];
      setFacilities(newFacilities);
      return;
    }
    const newFacilities = facilities.filter(
      (el) => el?.id !== selectedFacility.id
    );

    setFacilities(newFacilities);
  };
  const uploadApartment = async () => {
    // setIsUploaded(true);
    //     setIsAlert(true);
    if (createdApartment) {
      const res = await postRequest(createdApartment);
      console.log(res);

      if (res?.data) {
        console.log("success"); setIsAlert(true);
        setIsUploaded(true);
       
        return;
      }
      setIsUploaded(false);
      setIsAlert(true);
    }
  };
  const renderAlert = () => {
    if (isUploaded) {
      return (
        <Alert
          type={"success"}
          ref={bottomSheetRef}
          titleArray={[
            { fontWeight: "normal", text: "Your listing is now " },
            { fontWeight: "bold", text: " published" },
          ]}
          buttonsArray={[
            {
              textColor: theme.colors.text.primary,
              backgroundColor: theme.colors.bg.secondary,
              title: "Add More",
              onPress: () => {
                closeAlert();
                setStatesToDefault();
              },
            },
            {
              textColor: theme.colors.text.inverse,
              backgroundColor: theme.colors.brand.primary,
              title: "Finish",
              onPress: () => {
                navigation.navigate("Apartments");
              },
            },
          ]}
          snapPointPercent={"55%"}
          isOpen={isAlert}
          onClose={() => setIsAlert(false)}
        />
      );
    }
    return (
      <Alert
        type={"error"}
        ref={bottomSheetRef}
        titleArray={[
          { fontWeight: "normal", text: "Aw snap, Some" },
          { fontWeight: "bold", text: " error" },
          { fontWeight: "normal", text: " happened" },
        ]}
        buttonsArray={[
          {
            textColor: theme.colors.text.primary,
            backgroundColor: theme.colors.bg.secondary,
            title: "Close",
            onPress: () => {
              navigation.navigate("Apartments");
            },
          },
          {
            textColor: theme.colors.text.inverse,
            backgroundColor: theme.colors.brand.primary,
            title: "Retry",
            onPress: () => {
              closeAlert();
            },
          },
        ]}
        snapPointPercent={"55%"}
        isOpen={isAlert}
        onClose={() => setIsAlert(false)}
      />
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );
  useEffect(() => {
    if (!isPermissionsAccepted) {
      getPermissions();
    }
    console.log("cur");
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setCreatedApartment({
      location: location,
      category: category,
      price: price,
      address: address,
      title: title,
      description: description,
      squareMeter: squareMeter,
      photos: photos,
      authorId: "hkihigiu",
      totalRooms: totalRooms,
      facilities: facilities,
    });
  }, [
    location,
    category,
    price,
    address,
    title,
    description,
    squareMeter,
    photos,
    totalRooms,
    facilities,
  ]);

  return (
    <SafeArea>
      <Header>
        <IconButton onPress={() => navigation.goBack()} />
        <Text variant="title">Property</Text>
        <Spacer position="right" size="xl" />
      </Header>
      <ScrollView ref={mainRef} scrollEnabled={!isDisableScrollView}>
        <SectionTitle>
          <Text variant="title">Listing Title</Text>
          <Spacer position="top" size="large" />
          <Input
            placeholder="Bungalow House 1 room with ..."
            value={title}
            setValue={(state) => setTitle(state)}
          />
        </SectionTitle>
        <SectionDescription>
          <Text variant="title">Listing Description</Text>
          <Spacer position="top" size="large" />
          <Input
            placeholder="Perfect holiday house with pool ..."
            value={description}
            setValue={(state) => setDescription(state)}
            multiline={true}
            textSize="medium"
          />
        </SectionDescription>
        <SectionType>
          <Text variant="title">Listing Type</Text>
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
            {apartmentCategories.map((currentCategory: ApartmentCategory) => {
              const isSelected = category
                ? currentCategory.id === category?.id
                : false;
              return (
                <Spacer position="right" size="medium">
                  <Spacer position="top" size="medium" />
                  <Chip
                    size="large"
                    isButton={true}
                    onPress={() => setCategory(currentCategory)}
                    isSelected={!!isSelected}
                    title={currentCategory.name}
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
                {address}
              </Address>
            </Spacer>
          </LocationAddressWrapper>
          <Spacer position="top" size="large" />
          <MapLocationWrapper>
            <Map
              ref={mapRef}
              userInterfaceStyle={"light"}
              region={location}
              zoomEnabled={true}
              onRegionChangeComplete={(data) => {
                getAddressFromCoords(data);
                setLocation(data);
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
        <SectionNumberInput>
          <Text variant="title">Rent Price</Text>
          <Spacer position="top" size="large" />
          <Input
            value={price}
            setValue={(state) => setPrice(state)}
            iconName="ios-logo-euro"
            placeholder="price per month"
            keyboardType="numeric"
          />
        </SectionNumberInput>
        <SectionNumberInput>
          <Text variant="title">Square Meter</Text>
          <Spacer position="top" size="large" />
          <Input
            value={squareMeter}
            setValue={(state) => setSquareMeter(state)}
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
              value={totalRooms}
              onIncrease={() => {
                setTotalRooms(totalRooms + 1);
              }}
              onDecrease={() => {
                setIsAlert(true);
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
            {facilitiesList.map((el) => {
              const selectedFacility = facilities?.find(
                (value) => value.name === el.name
              );

              return (
                <Spacer key={el.id} position="right" size="medium">
                  <Spacer position="top" size="medium" />
                  <Chip
                    onPress={() => onPressFacility(el, selectedFacility)}
                    size="large"
                    isButton={true}
                    isSelected={!!selectedFacility}
                    title={el.name}
                  />
                </Spacer>
              );
            })}
          </ChipsWrapper>
        </SectionFacility>
        <ApplyButtonWrapper>
          <Button
            disabled={!isValidApartment(createdApartment)}
            onPress={uploadApartment}
            title={"Upload"}
          />
        </ApplyButtonWrapper>
      </ScrollView>
      {isAlert && renderAlert()}
    </SafeArea>
  );
};
