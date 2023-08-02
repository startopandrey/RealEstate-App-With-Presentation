import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartIcon, CartIconContainer } from "../components/checkout.styles";
import { Text } from "../../../components/typography/text.component";
import { colors } from "../../../infrastructure/theme/colors";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CheckoutStackNavigatorParamList } from "src/types/checkout";

type Props = NativeStackScreenProps<
  CheckoutStackNavigatorParamList,
  "CheckoutError"
>;
export const CheckoutErrorScreen = ({ route }: Props) => {
  const { error } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error}></CartIcon>
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
