import { createStackNavigator } from "@react-navigation/stack";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen";

import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";
import { CheckoutStackNavigatorParamList } from "src/types/checkout";

const CheckoutStack = createStackNavigator<CheckoutStackNavigatorParamList>();
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
