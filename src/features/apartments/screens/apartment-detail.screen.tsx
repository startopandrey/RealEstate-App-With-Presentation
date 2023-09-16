import React, { useContext } from "react";

import { SafeArea } from "@src/components/utility/safe-area.component";
import { Spacer } from "@src/components/spacer/spacer.component";

import { CartContext } from "@src/services/cart/cart.context";
import { View, Linking } from "react-native";

import {
  ApartmentFeature,
  ApartmentStackNavigatorParamList,
  NewApartment,
} from "@src/types/apartments/apartment";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApartmentOverview } from "../components/apartment-overview.component";

import { Text } from "@src/components/typography/text.component";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@src/infrastructure/theme";
import { Chip } from "@src/components/chip/chip.component";
import { Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import { IconButton } from "@src/components/icon-button/icon-button.component";
import { LocationContext } from "@src/services/location/location.context";
import { Marker } from "react-native-maps";
import {
  Header,
  Title,
  HeaderLocation,
  SaleInfo,
  SaleType,
  SalePriceWrapper,
  SalePrice,
  SaleMonth,
  AgentCard,
  AgentInfo,
  AgentContact,
  ApartmentLocation,
  ApartmentAddressWrapper,
  MapApartmentWrapper,
  Map,
  MapRedirectButton,
  DescriptionWrapper,
  Description,
  ApartmentFeatures,
  ChipsWrapper,
} from "../components/apartment-detail.styles";
import { CustomMarker } from "@src/features/map/components/custom-marker.component";
import { LATITUDE_DELTA } from "@src/utils/constants";
import { facilitiesList } from "@src/../mockData";
import { Avatar } from "@src/components/avatar/avatar.component";

type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "ApartmentDetail"
>;

interface FeatureVariantsType {
  icon: keyof typeof Ionicons.glyphMap;
  id: string;
}

export const ApartmentDetailScreen = ({ navigation, route }: Props) => {
  const { apartment }: { apartment: NewApartment } = route.params!;
  const { title, address, price, authorId, photos, facilities, features } =
    apartment;
  const apartmentPhoto =
    photos[0]?.url ??
    "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg";
  const { addToCart } = useContext(CartContext);
  const { location } = useContext(LocationContext);

  const featureVariant: FeatureVariantsType[] = [
    {
      icon: "bed-outline",
      id: "1",
    },
    {
      icon: "water-outline",
      id: "2",
    },
    {
      icon: "fast-food-outline",
      id: "3",
    },
  ];

  return (
    <SafeArea>
      <ScrollView>
        <ApartmentOverview navigation={navigation} apartment={apartment} />
        <Header>
          <Title variant="title">{title}</Title>
          <HeaderLocation>
            <Ionicons
              color={theme.colors.ui.primary}
              size={14}
              name="location-sharp"
            />
            <Spacer position="right" size="small" />
            <Text color={theme.colors.text.muted} variant="body">
              {address}
            </Text>
          </HeaderLocation>
        </Header>
        <SaleInfo>
          <SaleType>
            <Spacer position="right" size="medium">
              <Chip isSelected={true} size="large" title="Rent" />
            </Spacer>
            <Chip isSelected={false} size="large" title="Buy" />
          </SaleType>
          <SalePriceWrapper>
            <SalePrice variant="title">€ {price}</SalePrice>
            <SaleMonth variant="body" color={theme.colors.text.muted}>
              per month
            </SaleMonth>
          </SalePriceWrapper>
        </SaleInfo>
        <DescriptionWrapper>
          <Text variant="title">Description</Text>
          <Spacer position="top" size="large" />
          <Description variant="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Description>
        </DescriptionWrapper>
        <Spacer position="top" size="large">
          <Divider />
        </Spacer>
        <Spacer position="bottom" size="large" />
        <AgentCard onPress={() => Linking.openURL("tel:+380673569597")}>
          <AgentInfo>
            <Spacer position="right" size="large">
              <Avatar
                size={50}
                url={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIsLl_2a68ulkk-voH_jG_wNMlf7HTqEIXGC4N4LWuWzmuKeVE8Osr9f-NiW7WzjTqrRk&usqp=CAU"
                }
              />
            </Spacer>
            <AgentContact>
              <Text variant="caption">Aaron</Text>
              <Text variant="body">Real Estate Agent</Text>
            </AgentContact>
          </AgentInfo>

          <Ionicons
            color={theme.colors.text.primary}
            name="call-outline"
            size={20}
          />
        </AgentCard>
        <Spacer position={"top"} size="medium" />
        <ApartmentFeatures>
          <Text variant="title">Property Features</Text>
          <Spacer position={"top"} size="large">
            <ChipsWrapper>
              {features.map((item: ApartmentFeature) => {
                const variant = featureVariant.find((el) => el.id === item.id);

                if (!variant) {
                  return;
                }
                return (
                  <Spacer position={"right"} size={"medium"}>
                    <Spacer position="top" size="medium" />
                    <Chip
                      size={"large"}
                      iconColor={theme.colors.brand.primary}
                      iconName={variant.icon}
                      title={`${item.type} ${item.quantity}`}
                    />
                  </Spacer>
                );
              })}
            </ChipsWrapper>
          </Spacer>
        </ApartmentFeatures>
        <Spacer position={"left"} size="medium">
          {facilities && (
            <View>
              <Text variant="title">Property Facilities</Text>
              <Spacer position="top" size="large" />
              <ChipsWrapper>
                {facilitiesList.map((el) => {
                  const selectedFacility = facilities.find(
                    (value) => value.name === el.name
                  );
                  return (
                    <Spacer position="right" size="medium">
                      <Spacer position="top" size="medium" />
                      <Chip
                        size="large"
                        isSelected={!!selectedFacility}
                        title={el.name}
                      />
                    </Spacer>
                  );
                })}
              </ChipsWrapper>
            </View>
          )}
        </Spacer>
        <Spacer position={"top"} size="large" />
        <ApartmentLocation>
          <Text variant="title">Location & Public Facilities</Text>
          <ApartmentAddressWrapper>
            <IconButton
              onPress={() => null}
              iconName="location-outline"
              iconColor={theme.colors.ui.primary}
            />
            <Spacer position="left" size="medium">
              <Text color={theme.colors.text.muted} variant="body">
                {address}
              </Text>
            </Spacer>
          </ApartmentAddressWrapper>
          <Spacer position="top" size="large" />
          <MapApartmentWrapper
            onPress={() =>
              navigation.navigate("Map", { selectedApartment: apartment })
            }
          >
            <Map
              userInterfaceStyle={"light"}
              region={{
                latitude: apartment.location.latitude,
                longitudeDelta: 0.01,
                latitudeDelta: LATITUDE_DELTA,
                longitude: apartment.location.longitude,
              }}
            >
              <Marker
                key={apartment.title}
                title={apartment.title}
                flat
                onPress={() => null}
                coordinate={{
                  latitude: apartment.location.latitude,
                  longitude: apartment.location.longitude,
                }}
              >
                <CustomMarker
                  image={
                    apartment.photos[0].url ??
                    "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png"
                  }
                />
              </Marker>
            </Map>
            <MapRedirectButton>
              <Text variant="body">View on map</Text>
            </MapRedirectButton>
          </MapApartmentWrapper>
        </ApartmentLocation>
      </ScrollView>

      {/* <Spacer position={"bottom"} size="large">
        <OrderButton
          icon="cash"
          mode="contained"
          onPress={() => {
            addToCart("dfdf", apartment);
            navigation.navigate("Checkout");
          }}
        >
          Order Special Only 12.99!
        </OrderButton>
      </Spacer> */}
    </SafeArea>
  );
};
