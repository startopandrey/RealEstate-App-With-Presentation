import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { SafeArea } from "@src/components/utility/safe-area.component";
import { PostStackNavigatorParamList } from "@src/types/post";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconButton } from "@src/components/icon-button/icon-button.component";
import { Text } from "@src/components/typography/text.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { Input } from "@src/components/input/input.component";

import { Chip } from "@src/components/chip/chip.component";
import { FlatList, ScrollView } from "react-native";
import { theme } from "@src/infrastructure/theme";
import { CustomMarker } from "@src/features/map/components/custom-marker.component";
import { Ionicons } from "@expo/vector-icons";
import GridView from "react-native-draggable-gridview";
import _ from "lodash";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  OUTER_CARD_WIDTH,
} from "@src/utils/constants";
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
import { Button } from "@src/components/button/button.component";
import {
  apartmentCategories,
  facilitiesList,
  initialNewApartment,
} from "@src/../mockData";
import {
  getCurrentUserLoction,
  isLocationPermission,
} from "@src/services/helpers/location.helper";
import {
  isGalleryPermission,
  pickGalleryImage,
} from "@src/services/helpers/photo.helper";
import { MapLocationType } from "@src/types/location";
import {
  ApartmentCategory,
  ApartmentPhoto,
  Facility,
  NewApartment,
} from "@src/types/apartments/apartment";
import { postRequest } from "@src/services/post/post.service";
import { isValidApartment } from "@src/services/post/post.utils";
import { Alert } from "@src/components/alert/alert.component";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "@src/components/loading/loading.component";
import { useCheckNetworkConnection } from "@src/utils/network";
import { AuthenticationContext } from "@src/services/authentication/authentication.context";

type Props = NativeStackScreenProps<PostStackNavigatorParamList, "Post">;

export const PostScreen = ({ navigation }: Props): React.JSX.Element => {
  const mapRef = useRef<MapView | null>(null);
  const mainRef = useRef<ScrollView>(null);
  const { user } = useContext(AuthenticationContext);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDisableScrollView, setIsDisableScrollView] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPermissionsAccepted, setIsPermissionsAccepted] =
    useState<boolean>(false);
  const [createdApartment, setCreatedApartment] =
    useState<NewApartment>(initialNewApartment);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const photosLength = createdApartment.photos
    ? createdApartment.photos.length
    : 0;

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
  const clearStates = useCallback(() => {
    setIsAlert(false);
    setCreatedApartment((apartment) => ({
      ...initialNewApartment,
      location: apartment.location,
      address: apartment.address,
    }));
    scrollToTop();
    // setIsPermissionsAccepted(false);
  }, []);
  const getAddressFromCoords = (e) => {
    if (mapRef) {
      mapRef?.current
        ?.addressForCoordinate(e)
        .then((address) => {
          setCreatedApartment((apartment) => ({
            ...apartment,
            address: `${address.country}, ${address.locality}, ${address.name}`,
          }));
        })
        .catch((err) => {
          console.log(err);
          setCreatedApartment((apartment) => ({
            ...apartment,
            address: "Address could not be found",
          }));
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
    if (createdApartment.location.latitude !== 0) {
      return;
    }
    const currentLocation = await getCurrentUserLoction();

    if (currentLocation) {
      setCreatedApartment((apartment) => ({
        ...apartment,
        location: generateLocationObject(
          currentLocation?.coords?.latitude,
          currentLocation?.coords?.longitude,
          LONGITUDE_DELTA,
          LATITUDE_DELTA
        ),
      }));
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

    const newPhoto: ApartmentPhoto = {
      key: `${
        createdApartment.photos?.length === 0
          ? 0
          : createdApartment.photos?.length + 1
      }`,
      photoUrl: photoUri,
      name: name,
    };
    if (createdApartment.photos) {
      setCreatedApartment((apartment) => ({
        ...apartment,
        photos: photosLength
          ? [...createdApartment.photos, newPhoto]
          : [newPhoto],
      }));
      return;
    }
    setCreatedApartment((apartment) => ({
      ...apartment,
      photos: [newPhoto],
    }));
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

      if (!_.isEqual(createdApartment.photos, photos1)) {
        setCreatedApartment((apartment) => ({ ...apartment, photos: photos1 }));
      }
      setIsDisableScrollView(false);
    },
    [createdApartment.photos]
  );

  const onPressDelete = useCallback(
    (item) => {
      if (item === "+" || !createdApartment.photos) {
        return;
      }
      setCreatedApartment((apartment) => ({
        ...apartment,
        photos: apartment.photos.filter((v) => v.key !== item.key),
      }));
    },
    [createdApartment.photos]
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
  const scrollToTop = () => {
    mainRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const closeAlert = () => {
    scrollToTop();
    setIsAlert(false);
    bottomSheetRef.current?.close();
  };
  const onPressCounter = (operation, type) => {
    const newFeatures = createdApartment.features.map((el) => {
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
    setCreatedApartment((apartment) => ({
      ...apartment,
      features: newFeatures,
    }));
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
      setCreatedApartment((apartment) => ({
        ...apartment,
        facilities: newFacilities,
      }));
      return;
    }
    const newFacilities = createdApartment.facilities.filter(
      (el) => el?.id !== selectedFacility.id
    );

    setCreatedApartment((apartment) => ({
      ...apartment,
      facilities: newFacilities,
    }));
  };
  const uploadApartment = async () => {
    setIsLoading(true);
    const res = await postRequest(createdApartment);

    if (res?.data) {
      setIsLoading(false);
      setIsAlert(true);
      setIsUploaded(true);

      return;
    }
    setIsLoading(false);
    setIsUploaded(false);
    setIsAlert(true);
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

                clearStates();
              },
            },
            {
              textColor: theme.colors.text.inverse,
              backgroundColor: theme.colors.brand.primary,
              title: "Finish",
              onPress: () => {
                closeAlert();
                clearStates();
                navigation.navigate("Apartments");
              },
            },
          ]}
          snapPointPercent={"55%"}
          isOpen={isAlert}
          onClose={() => {
            clearStates();
            navigation.navigate("Apartments");
          }}
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
              clearStates();
              closeAlert();
            },
          },
        ]}
        snapPointPercent={"55%"}
        isOpen={isAlert}
        onClose={() => {
          closeAlert();
        }}
      />
    );
  };
  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );
  const isConnected = useCheckNetworkConnection();
  useEffect(() => {
    if (!isConnected) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isConnected]);
  useEffect(() => {
    setCreatedApartment((apartment: NewApartment) => ({
      ...apartment,
      authorId: user._id,
    }));
  }, [user]);

  useEffect(() => {
    if (!isPermissionsAccepted) {
      getPermissions();
    }
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
      <ScrollView ref={mainRef} scrollEnabled={!isDisableScrollView}>
        <SectionTitle>
          <Text variant="title">Listing Title</Text>
          <Spacer position="top" size="large" />
          <Input
            placeholder="Bungalow House 1 room with ..."
            value={createdApartment.title}
            setValue={(state) =>
              setCreatedApartment((apartmnent) => ({
                ...apartmnent,
                title: state,
              }))
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
              setCreatedApartment((apartmnent) => ({
                ...apartmnent,
                description: state,
              }))
            }
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
              const isSelected = createdApartment.category
                ? currentCategory.id === createdApartment.category?.id
                : false;
              return (
                <Spacer position="right" size="medium">
                  <Spacer position="top" size="medium" />
                  <Chip
                    size="large"
                    isButton={true}
                    onPress={() =>
                      setCreatedApartment((apartmnent) => ({
                        ...apartmnent,
                        category: currentCategory,
                      }))
                    }
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
                {createdApartment.address}
              </Address>
            </Spacer>
          </LocationAddressWrapper>
          <Spacer position="top" size="large" />
          <MapLocationWrapper>
            <Map
              ref={mapRef}
              userInterfaceStyle={"light"}
              region={createdApartment.location}
              zoomEnabled={true}
              onRegionChangeComplete={(data) => {
                getAddressFromCoords(data);
                setCreatedApartment((apartmnent) => ({
                  ...apartmnent,
                  location: data,
                }));
              }}
            />
            <CustomMarkerWrapper>
              <CustomMarker image={createdApartment.photos[0]?.photoUrl} />
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
                createdApartment.photos
                  ? ["+", ...createdApartment.photos]
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
              setCreatedApartment((apartmnent) => ({
                ...apartmnent,
                price: state,
              }))
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
              setCreatedApartment((apartmnent) => ({
                ...apartmnent,
                squareMeter: state,
              }))
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
            data={createdApartment.features}
            keyExtractor={(item) => item.type ?? "12"}
            renderItem={({ item }) => (
              <Spacer position="bottom" size={"large"}>
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
                setCreatedApartment((apartment) => ({
                  ...apartment,
                  totalRooms: apartment.totalRooms + 1,
                }));
              }}
              onDecrease={() => {
                if (createdApartment.totalRooms <= 1) {
                  return null;
                }
                setCreatedApartment((apartment) => ({
                  ...apartment,
                  totalRooms: apartment.totalRooms - 1,
                }));
              }}
            />
          </Spacer>
        </SectionRooms>
        <SectionFacility>
          <Text variant="title">Property Facilities</Text>
          <Spacer position="top" size="large" />
          <ChipsWrapper>
            {facilitiesList.map((el) => {
              const selectedFacility = createdApartment.facilities?.find(
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
      <Loading isOpen={isLoading} />
      {isAlert && renderAlert()}
    </SafeArea>
  );
};
