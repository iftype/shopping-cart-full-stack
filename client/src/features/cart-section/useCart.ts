import { useEffect, useState } from "react";
import type { CartItem } from "../../entites/cart/model";
import {
  deleteCartProduct,
  getCart,
  updateCart,
  type CartUpdateRequest,
} from "../../entites/cart/api";

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

  const changeQuantity = async ({ productId, quantity }: CartUpdateRequest) => {
    if (state.status !== "success") return;

    await updateCart({ productId, quantity });

    setState({
      status: "success",
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    });
  };

  const handleDelete = async (productId: string) => {
    if (state.status !== "success") return;

    await deleteCartProduct(productId);

    setState({
      status: "success",
      cart: state.cart.filter((item) => item.product.id !== Number(productId)),
    });
  };

  return {
    state,
    changeQuantity,
    handleDelete,
  };
};
