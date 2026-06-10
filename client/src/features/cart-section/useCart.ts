import { useEffect, useRef, useState } from "react";
import { type CartItem, isValidQuantity } from "../../entites/cart/model";
import { deleteCartProduct, getCarts, updateCart } from "../../entites/cart/api";

type CartState =
  | { status: "loading" }
  | { status: "success"; cart: CartItem[] }
  | { status: "error"; error: string };

export const useCart = () => {
  const [state, setState] = useState<CartState>({
    status: "loading",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMutating, setIsMutating] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const cartItems = await getCarts();
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
    if (state.status !== "success") return;
    if (!isValidQuantity(quantity)) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    const optimistic = state.cart;
    setState({
      status: "success",
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    });

    timerRef.current = setTimeout(async () => {
      setIsMutating(true);
      try {
        const { quantity: checkQty } = await updateCart({ productId, quantity });
        setState((prev) => {
          if (prev.status !== "success") return prev;
          return {
            status: "success",
            cart: prev.cart.map((item) =>
              item.product.id === productId ? { ...item, quantity: checkQty } : item,
            ),
          };
        });
      } catch (error) {
        if (!(error instanceof Error)) throw error;
        setState({ status: "success", cart: optimistic });
        setServerError(error.message);
      } finally {
        setIsMutating(false);
      }
    }, 300);
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
      setServerError(error.message);
    }
  };

  return {
    state,
    isMutating,
    changeQuantity,
    handleDelete,
    serverError,
  };
};
