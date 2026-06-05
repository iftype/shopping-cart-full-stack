import { useNavigate } from "react-router";
import {
  calculateOrderPrice,
  calculateShippingFee,
  calculateTotalOrderPrice,
  type CartItem,
} from "../../entites/cart/model";

export interface CartSummaryProps {
  checkedItems: CartItem[];
}

export const CartSummary = ({ checkedItems }: CartSummaryProps) => {
  const navigate = useNavigate();
  const orderPrice = calculateOrderPrice(checkedItems);
  const shippingFee = calculateShippingFee(orderPrice);
  const totalOrderPrice = calculateTotalOrderPrice(orderPrice, shippingFee);

  const handleOrder = () => {
    navigate("/result", {
      state: {
        checkedItems,
      },
    });
  };

  return (
    <div>
      <div> 주문 금액: {orderPrice.toLocaleString()}원</div>
      <div> 배송비: {shippingFee.toLocaleString()}원</div>
      <div>총 결제 금액: {totalOrderPrice.toLocaleString()}원</div>
      <button onClick={handleOrder} disabled={checkedItems.length === 0}>
        주문확인
      </button>
    </div>
  );
};
