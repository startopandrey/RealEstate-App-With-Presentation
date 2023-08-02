import React, { useContext, useEffect, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CreditCardInput } from "../components/credit-card.component";
import { CartContext } from "../../../services/cart/cart.context";
import { Text } from "../../../components/typography/text.component";
import {
  CartIcon,
  CartIconContainer,
  ClearButton,
  NameInput,
  PayButton,
} from "../components/checkout.styles";
import {
  PaymentProcessing,
  RestaurantCard,
} from "../../restaurants/components/restaurant-info-card.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { ScrollView } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Divider, List } from "react-native-paper";
import { payRequest } from "../../../services/checkout/checkout.service";
import { NavigationProp } from "@react-navigation/native";

import {
  Card,
  CheckoutStackNavigatorParamList,
} from "../../../types/checkout/index";

// import { CreditCardInput } from "@big-toni/react-native-credit-card-input";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
  CheckoutStackNavigatorParamList,
  "Checkout"
>;
export const CheckoutScreen = ({ navigation }: Props) => {
  const { cart, restaurant, clearCart, sum } = useContext(CartContext);

  const [name, setName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [card, setCard] = useState<Card>();

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id || !name) {
      setIsLoading(false);
      navigation.navigate("CheckoutError", {
        error: "Please fill in valid credit card",
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then((res) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccess");
        return;
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate("CheckoutError", {
          error: err,
        });
        return;
      });
    return;
  };

  if (!cart.length) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off"></CartIcon>
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant!}></RestaurantInfoCard>
      {isLoading && <PaymentProcessing></PaymentProcessing>}
      <ScrollView>
        <Spacer position={"left"} size="medium">
          <Spacer position={"top"} size={"large"}>
            <Text>Your order</Text>
          </Spacer>
          <List.Section>
            {cart.map((_, i) => {
              return (
                <List.Item
                  key={`item-${i}`}
                  title={`Special - ${i / 100}`}
                ></List.Item>
              );
            })}
          </List.Section>
          <Text>Total: ${sum / 100}</Text>
        </Spacer>
        <Spacer size={"large"}></Spacer>
        <Divider></Divider>
        <NameInput
          label="Name"
          value={name}
          onChangeText={(t: string) => (t.length ? setName(t) : setName(""))}
        ></NameInput>
        <Spacer position={"top"} size={"large"}>
          {name && (
            <CreditCardInput
              onSuccess={(card: Card) => setCard(card)}
              onError={() => {
                setIsLoading(false);
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong processing your card!",
                });
              }}
              name={name}
            ></CreditCardInput>
          )}
        </Spacer>
        <Spacer position={"top"} size={"xl"}></Spacer>
        <Spacer position={"bottom"} size={"large"}>
          <PayButton
            disabled={isLoading}
            onPress={() => onPay()}
            icon="cash"
            mode="contained"
          >
            Pay
          </PayButton>
        </Spacer>
        <ClearButton
          disabled={isLoading}
          icon="cart-off"
          mode="contained"
          onPress={clearCart}
        >
          Clear Cart
        </ClearButton>
      </ScrollView>
    </SafeArea>
  );
};
