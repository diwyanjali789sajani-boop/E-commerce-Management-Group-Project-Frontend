import React, { createContext, useReducer, useContext, type ReactNode } from "react";

// Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId?: string;
}

// Cart item type
export interface CartItem extends Product {
  quantity: number;
}

// Actions
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: Product }
  | { type: "INCREMENT_ITEM"; payload: Product }
  | { type: "DECREMENT_ITEM"; payload: Product }
  | { type: "CLEAR_CART" };

// State type
interface CartState {
  cart: CartItem[];
}

// Context type
interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}

// Initial state
const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
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
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
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

    case "CLEAR_CART": {
      localStorage.removeItem("cart");
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType>({
  cart: [],
  dispatch: () => null,
});

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);
