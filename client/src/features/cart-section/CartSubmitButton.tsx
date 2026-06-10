import type { CartItem } from "../../entites/cart/model";
import { BottomButton } from "../../shared/BottomButton";

interface CartSubmitButtonProps {
  checkedItems: CartItem[];
  onSubmit: () => void;
}

export const CartSubmitButton = ({ checkedItems, onSubmit }: CartSubmitButtonProps) => (
  <BottomButton onClick={onSubmit} disabled={checkedItems.length === 0} text="주문확인" />
);
