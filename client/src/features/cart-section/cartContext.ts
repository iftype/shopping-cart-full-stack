import { createContext, useContext } from "react";
import type { CartItem } from "../../entites/cart/model";

export interface CartContextType {
  cartItems: CartItem[];
  checks: number[];
  toggleSelect: (id: number) => void;
  toggleAll: () => void;
  changeQuantity: (id: number, quantity: number) => void;
  handleDelete: (id: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContext.Provider");
  }
  return context;
};
