// CartContext.tsx
import React, { createContext, useReducer, useContext, useEffect, type ReactNode } from "react";
import type { Product } from "../../types"; // import Product type

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

type Action =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: Product }
  | { type: "INCREMENT_ITEM"; payload: Product }
  | { type: "DECREMENT_ITEM"; payload: Product }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const CartContext = createContext<{
  cart: CartItem[];
  dispatch: React.Dispatch<Action>;
}>({ cart: [], dispatch: () => null });

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      let newCart: CartItem[];

      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "REMOVE_ITEM": {
      const newCart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "INCREMENT_ITEM": {
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "DECREMENT_ITEM": {
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
