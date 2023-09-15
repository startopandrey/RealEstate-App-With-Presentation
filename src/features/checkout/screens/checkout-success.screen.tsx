import React from "react";
import { SafeArea } from "@src/components/utility/safe-area.component";
import { CartIcon, CartIconContainer } from "../components/checkout.styles";
import { Text } from "@src/components/typography/text.component";
import { colors } from "@src/infrastructure/theme/colors";

export const CheckoutSuccessScreen = () => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="check-bold" bg={colors.ui.success}></CartIcon>
        <Text variant="label">Success!</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
