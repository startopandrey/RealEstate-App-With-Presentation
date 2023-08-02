import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Restaurant } from "src/types/restaurants/restaurant";
interface CartContextType {
  addToCart: (item: string, rst: Restaurant) => void;
  clearCart: () => void;
  restaurant?: Restaurant | null;
  cart: string[];
  sum: number;
}
export const CartContext = createContext<CartContextType>({
  addToCart: function (item: string, rst: Restaurant): void {
    throw new Error("Function not implemented.");
  },
  clearCart: function (): void {
    throw new Error("Function not implemented.");
  },

  cart: [],
  sum: 0,
});
export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [restaurant, setRestaurant] = useState<Restaurant | null>();
  const [cart, setCart] = useState<string[]>([]);
  const [sum, setSum] = useState<number>(0);
  const saveCart = async (rst: Restaurant, crt: string[], uid: string) => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (err) {
      console.log(err);
    }
  };
  const loadCart = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value != null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const add = (item: string, rst: Restaurant) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };
  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };
  useEffect(() => {
    if (user && user.uid ) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && restaurant) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [cart, restaurant, user]);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc) => {
      return (acc += 12.99);
    }, 0);
    setSum(newSum);
  }, [cart]);
  return (
    <CartContext.Provider
      value={{ addToCart: add, clearCart: clear, restaurant, cart, sum }}
    >
      {children}
    </CartContext.Provider>
  );
};
