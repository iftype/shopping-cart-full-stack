import { CartEmptySection, CartSection } from "../features/cart-section/CartSection";
import { useCart } from "../features/cart-section/useCart";
import { ErrorInfo } from "../shared/ErrorInfo";
import { Header } from "../shared/Header";
import { Spinner } from "../shared/Spinner";
import { SubmitButton } from "../shared/SubmitButton";

export const CartPage = () => {
  const { state, changeQuantity, handleDelete } = useCart();
  const { status } = state;

  const isSuccess = status === "success";
  const cartItems = isSuccess ? state.cart : [];

  return (
    <>
      <Header />
      {status === "loading" && <Spinner />}
      {status === "error" && <ErrorInfo message="카트를 불러오는 중입니다." />}
      {isSuccess && cartItems.length === 0 && <CartEmptySection />}
      {isSuccess && cartItems.length !== 0 && (
        <CartSection
          cartItems={cartItems}
          changeQuantity={changeQuantity}
          handleDelete={handleDelete}
        />
      )}
      <SubmitButton />
    </>
  );
};
