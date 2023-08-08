import React, { useContext, useEffect, useState } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/apartment-info-card.styles";
import { CartContext } from "../../../services/cart/cart.context";
import { ListRenderItem } from "react-native";
import {
  Apartment,
  ApartmentStackNavigatorParamList,
} from "src/types/apartments/apartment";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApartmentOverview } from "../components/apartment-overview.component";

import { Text } from "../../../components/typography/text.component";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import { Chip } from "../../../components/chip/chip.component";
import { Divider } from "react-native-paper";
import { FlatList, ScrollView } from "react-native";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { LocationContext } from "../../../services/location/location.context";
import MapView from "react-native-maps";
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
  AgentPhoto,
  FacilitiesList,
  ApartmentLocation,
  ApartmentAddressWrapper,
  MapApartmentWrapper,
  Map,
  MapRedirectButton
} from "../components/apartment-detail.styles";

type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "ApartmentDetail"
>;

interface FacilityListProps {
  icon: keyof typeof Ionicons.glyphMap;
  facility: {
    name: string;
    number: number;
  };
}

export const ApartmentDetailScreen = ({ navigation, route }: Props) => {
  const { apartment }: { apartment: Apartment } = route.params!;
  const { title, address, apartmentPrice, author } = apartment;
  const { addToCart } = useContext(CartContext);
  const { location } = useContext(LocationContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location!;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);
  const facilitiesData: FacilityListProps[] = [
    {
      icon: "bed-outline",
      facility: {
        name: "Bedroom",
        number: 2,
      },
    },
    {
      icon: "water-outline",
      facility: {
        name: "Bathroom",
        number: 3,
      },
    },
    {
      icon: "fast-food-outline",
      facility: {
        name: "Kitchen",
        number: 1,
      },
    },
  ];
  const renderFacilityItem: ListRenderItem<FacilityListProps> = ({
    item,
  }: {
    item: FacilityListProps;
  }) => {
    console.log(item);
    return (
      <Spacer position={"right"} size={"medium"}>
        <Chip
          size={"large"}
          iconColor={theme.colors.brand.primary}
          iconName={item.icon}
          title={`${item.facility.number} ${item.facility.name}`}
        />
      </Spacer>
    );
  };
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
            <SalePrice variant="title">€ {apartmentPrice}</SalePrice>
            <SaleMonth variant="body" color={theme.colors.text.muted}>
              per month
            </SaleMonth>
          </SalePriceWrapper>
        </SaleInfo>
        <Spacer position="top" size="large">
          <Divider />
        </Spacer>
        <Spacer position="bottom" size="large" />
        <AgentCard>
          <AgentInfo>
            <Spacer position="right" size="large">
              <AgentPhoto source={{ uri: author.avatarImage }} />
            </Spacer>
            <AgentContact>
              <Text variant="caption">Anderson</Text>
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
        <Spacer position={"left"} size="medium">
          <ScrollView>
            <FacilitiesList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={facilitiesData}
              renderItem={renderFacilityItem}
              keyExtractor={(item: any) => item?.icon!}
            />
          </ScrollView>
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
          <Spacer position="top" size="large"></Spacer>
          <MapApartmentWrapper>
            <Map
              region={{
                latitude: lat,
                longitudeDelta: 0.01,
                latitudeDelta: latDelta,
                longitude: lng,
              }}
            ></Map>
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
