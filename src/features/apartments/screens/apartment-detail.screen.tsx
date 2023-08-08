import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";

import { ApartmentInfoCard } from "../components/apartment-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/apartment-info-card.styles";
import { CartContext } from "../../../services/cart/cart.context";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import {
  Apartment,
  ApartmentStackNavigatorParamList,
} from "src/types/apartments/apartment";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApartmentOverview } from "../components/apartment-overview.component";

type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "ApartmentDetail"
>;
export const ApartmentDetailScreen = ({ navigation, route }: Props) => {
  const { apartment }: { apartment: Apartment } = route.params!;

  const { addToCart } = useContext(CartContext);

  return (
    <SafeArea>
      <ApartmentOverview navigation={navigation} apartment={apartment} />

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
