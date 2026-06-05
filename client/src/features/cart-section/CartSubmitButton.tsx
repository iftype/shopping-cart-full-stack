import { useCartContext } from "./cartContext";
import { BottomButton } from "../../shared/BottomButton";

export const CartSubmitButton = ({ onSubmit }: { onSubmit: () => void }) => {
  const { cartItems, checks } = useCartContext();
  const checkedItems = cartItems.filter((item) => checks.includes(item.product.id));

  return <BottomButton onClick={onSubmit} disabled={checkedItems.length === 0} text="주문확인" />;
};
