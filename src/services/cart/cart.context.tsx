import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Apartment } from "src/types/apartments/apartment";
interface CartContextType {
  addToCart: (item: string, rst: Apartment) => void;
  clearCart: () => void;
  apartment?: Apartment | null;
  cart: string[];
  sum: number;
}
export const CartContext = createContext<CartContextType>({
  addToCart: function (item: string, rst: Apartment): void {
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
  const [apartment, setApartment] = useState<Apartment | null>();
  const [cart, setCart] = useState<string[]>([]);
  const [sum, setSum] = useState<number>(0);
  const saveCart = async (rst: Apartment, crt: string[], uid: string) => {
    try {
      const jsonValue = JSON.stringify({ apartment: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (err) {
      console.log(err);
    }
  };
  const loadCart = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value != null) {
        const { apartment: rst, cart: crt } = JSON.parse(value);
        setApartment(rst);
        setCart(crt);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const add = (item: string, rst: Apartment) => {
    if (!apartment || apartment.placeId !== rst.placeId) {
      setApartment(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };
  const clear = () => {
    setCart([]);
    setApartment(null);
  };
  useEffect(() => {
    if (user && user.uid ) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && apartment) {
      saveCart(apartment, cart, user.uid);
    }
  }, [cart, apartment, user]);

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
      value={{ addToCart: add, clearCart: clear, apartment, cart, sum }}
    >
      {children}
    </CartContext.Provider>
  );
};
