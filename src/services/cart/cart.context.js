import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [restaurant, setRestaurants] = useState(null);
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const add = (item, rst) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurants(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };
  const clear = () => {
    setCart([]);
    setRestaurants(null);
  };

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
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
