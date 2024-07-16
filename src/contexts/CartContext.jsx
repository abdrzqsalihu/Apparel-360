import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_GET_CART_DATA,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCartItemCount(data.length);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const clearCart = () => {
    setCartItemCount(0);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItemCount, setCartItemCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
