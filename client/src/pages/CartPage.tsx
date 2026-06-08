import { useNavigate } from "react-router";
import { CartEmptySection, CartSection } from "../features/cart-section/CartSection";
import { CartSummary } from "../features/cart-section/CartSummary";
import { CartSubmitButton } from "../features/cart-section/CartSubmitButton";
import { CartContext } from "../features/cart-section/cartContext";
import { useCart } from "../features/cart-section/useCart";
import { useCheckBox } from "../shared/useCheckBox";
import { ErrorInfo } from "../shared/ErrorInfo";
import { Header } from "../shared/Header";
import { Spinner } from "../shared/Spinner";

export const CartPage = () => {
  const { state, changeQuantity, handleDelete } = useCart();
  const { status } = state;

  const isSuccess = status === "success";
  const cartItems = isSuccess ? state.cart : [];

  const itemIds = cartItems.map((item) => item.product.id);
  const { checks, toggleSelect, toggleAll } = useCheckBox(itemIds);
  const checkedItems = cartItems.filter((item) => checks.includes(item.product.id));

  const navigate = useNavigate();
  const handleOrder = () => navigate("/result", { state: { checkedItems } });

  return (
    <>
      <Header />
      {status === "loading" && <Spinner />}
      {state.status === "error" && <ErrorInfo message={state.error} />}
      {isSuccess && cartItems.length === 0 && <CartEmptySection />}
      {isSuccess && cartItems.length !== 0 && (
        <CartContext.Provider
          value={{
            cartItems,
            checks,
            toggleSelect,
            toggleAll,
            changeQuantity,
            handleDelete,
          }}
        >
          <CartSection />
          <CartSummary />
          <CartSubmitButton onSubmit={handleOrder} />
        </CartContext.Provider>
      )}
    </>
  );
};
