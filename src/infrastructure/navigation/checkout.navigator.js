import { createStackNavigator } from "@react-navigation/stack";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen.js";

import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";

const CheckoutStack = createStackNavigator();
export const CheckoutNavigator = () => {
  return (
    <CheckoutStack.Navigator headerMode="none">
      <CheckoutStack.Screen
        name="Checkout"
        component={CheckoutScreen}
      ></CheckoutStack.Screen>
      <CheckoutStack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
      ></CheckoutStack.Screen>
      <CheckoutStack.Screen
        name="CheckoutError"
        component={CheckoutErrorScreen}
      ></CheckoutStack.Screen>
    </CheckoutStack.Navigator>
  );
};
