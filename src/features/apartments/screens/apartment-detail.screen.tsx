import React, { useContext, useState } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/apartment-info-card.styles";
import { CartContext } from "../../../services/cart/cart.context";

import {
  Apartment,
  ApartmentStackNavigatorParamList,
} from "src/types/apartments/apartment";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApartmentOverview } from "../components/apartment-overview.component";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import { Chip } from "../../../components/chip/chip.component";
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "ApartmentDetail"
>;
const Header = styled.View`
  padding: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[4]};
`;
const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
`;
const HeaderLocation = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
`;
const SaleInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[2]};
`;
const SaleType = styled.View`
  flex-direction: row;
`;
const SalePriceWrapper = styled.View`
  justify-content: flex-end;
`;
const SalePrice = styled(Text)`
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
  font-size: ${(props) => props.theme.fontSizes.h5};
`;
const SaleMonth = styled(Text)`
  text-align: left;
  align-self: flex-end;
`;
export const ApartmentDetailScreen = ({ navigation, route }: Props) => {
  const { apartment }: { apartment: Apartment } = route.params!;
  const { title, address, apartmentPrice } = apartment;
  const { addToCart } = useContext(CartContext);

  return (
    <SafeArea>
      <ApartmentOverview navigation={navigation} apartment={apartment} />
      <Header>
        <Title variant="title">{title}</Title>
        <HeaderLocation>
          <Ionicons
            color={theme.colors.ui.primary}
            size={14}
            name="location-sharp"
          />
          <Spacer position="right" size="small"></Spacer>
          <Text color={theme.colors.text.muted} variant="body">
            {address}
          </Text>
        </HeaderLocation>
      </Header>
      <SaleInfo>
        <SaleType>
          <Spacer position="right" size="medium">
            <Chip isSelected={true} size="large" title="Rent"></Chip>
          </Spacer>
          <Chip isSelected={false} size="large" title="Buy"></Chip>
        </SaleType>
        <SalePriceWrapper>
          <SalePrice variant="title">€ {apartmentPrice}</SalePrice>
          <SaleMonth variant="body" color={theme.colors.text.muted}>
            per month
          </SaleMonth>
        </SalePriceWrapper>
      </SaleInfo>

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
