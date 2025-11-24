import { createContext, use, useReducer, useEffect } from "react";
import type { ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  amount: number;
  image_url?: string; // Add this line
  image?: string; // Keep this for backward compatibility
  newPrice?: number;
  product_type: "coffee" | "equipment"; // Add this line
}
interface CartState {
  cart: CartItem[];
  total: number;
  amount: number;
  shipping: any;
  payment: any;
}

interface CartContextType extends CartState {
  addToCart: (product: CartItem) => void;
  clearCart: () => void;
  remove: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  cartShipping: (shipping: any) => void;
  cartPayment: (payment: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [], total: 0, amount: 0 };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "INCREASE": {
      const newCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: newCart };
    }

    case "DECREASE": {
      const newCart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      return { ...state, cart: newCart };
    }

    case "GET_TOTAL": {
      const { amount, total } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount, newPrice } = cartItem;
          const itemPrice = newPrice || price;
          cartTotal.amount += amount;
          cartTotal.total += amount * itemPrice;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      return { ...state, amount, total: parseFloat(total.toFixed(2)) };
    }

    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        const newCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return { ...state, cart: newCart };
      } else {
        const newCart = [...state.cart, { ...action.payload, amount: 1 }];
        return { ...state, cart: newCart };
      }
    }

    case "SHIPPING":
      return { ...state, shipping: action.payload };

    case "PAYMENT":
      return { ...state, payment: action.payload };

    case "LOAD_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

const initialState: CartState = {
  cart: [],
  total: 0,
  amount: 0,
  shipping: {},
  payment: {},
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from sessionStorage on mount
  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
    }

    const storedShipping = sessionStorage.getItem("shipping");
    if (storedShipping) {
      dispatch({ type: "SHIPPING", payload: JSON.parse(storedShipping) });
    }

    const storedPayment = sessionStorage.getItem("payment");
    if (storedPayment) {
      dispatch({ type: "PAYMENT", payload: JSON.parse(storedPayment) });
    }
  }, []);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  const addToCart = (product: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const increase = (id: string) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const decrease = (id: string) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const cartShipping = (shipping: any) => {
    sessionStorage.setItem("shipping", JSON.stringify(shipping));
    dispatch({ type: "SHIPPING", payload: shipping });
  };

  const cartPayment = (payment: any) => {
    sessionStorage.setItem("payment", JSON.stringify(payment));
    dispatch({ type: "PAYMENT", payload: payment });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        remove,
        increase,
        decrease,
        cartShipping,
        cartPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
