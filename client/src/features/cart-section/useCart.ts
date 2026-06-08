import { useEffect, useState } from "react";
import { type CartItem, isValidQuantity } from "../../entites/cart/model";
import { deleteCartProduct, getCart, updateCart } from "../../entites/cart/api";

type CartState =
  | { status: "loading" }
  | { status: "success"; cart: CartItem[] }
  | { status: "error"; error: string };

export const useCart = () => {
  const [state, setState] = useState<CartState>({
    status: "loading",
  });

  useEffect(() => {
    async function init() {
      try {
        const cartItems = await getCart();
        setState({
          status: "success",
          cart: cartItems,
        });
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }

        setState({
          status: "error",
          error: error.message,
        });
      }
    }
    init();
  }, []);

  const changeQuantity = async (productId: number, quantity: number) => {
    try {
      if (state.status !== "success") return;
      if (!isValidQuantity(quantity)) return;

      await updateCart({ productId, quantity });
      setState({
        status: "success",
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      window.alert(error.message);
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      if (state.status !== "success") return;

      await deleteCartProduct(String(productId));
      setState({
        status: "success",
        cart: state.cart.filter((item) => item.product.id !== productId),
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      window.alert(error.message);
    }
  };

  return {
    state,
    changeQuantity,
    handleDelete,
  };
};
