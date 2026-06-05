import { useLocation, Navigate, useNavigate } from "react-router";
import {
  calculateOrderPrice,
  calculateShippingFee,
  calculateTotalOrderPrice,
  type CartItem,
} from "../entites/cart/model";
import { BottomButton } from "../shared/BottomButton";

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = (location.state as { checkedItems: CartItem[] } | null)?.checkedItems;

  if (!items) {
    return <Navigate to="/" replace />;
  }

  const orderPrice = calculateOrderPrice(items);
  const shippingFee = calculateShippingFee(orderPrice);
  const totalPrice = calculateTotalOrderPrice(orderPrice, shippingFee);

  const handleSubmit = () => navigate("/");

  return (
    <div>
      <div>주문 확인</div>
      <div>
        총 {items.length}종류의 상품 {items.reduce((sum, item) => sum + item.quantity, 0)}개를
        주문합니다.
      </div>
      <p>최종 결제 금액을 확인해 주세요.</p>
      <div>
        <div>총 결제 금액</div>
        <div>{totalPrice.toLocaleString()}원</div>
      </div>
      <BottomButton onClick={handleSubmit} text="쇼핑 계속하기" />
    </div>
  );
};
