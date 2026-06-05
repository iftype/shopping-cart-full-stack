import {
  calculateOrderPrice,
  calculateShippingFee,
  calculateTotalOrderPrice,
  type CartItem,
} from "../../entites/cart/model";

export const CartSummary = ({ cartItems }: { cartItems: CartItem[] }) => {
  const orderPrice = calculateOrderPrice(cartItems);
  const shippingFee = calculateShippingFee(orderPrice);
  const totalOrderPrice = calculateTotalOrderPrice(orderPrice, shippingFee);
  return (
    <div>
      <div> 주문 금액: {orderPrice.toLocaleString()}원</div>
      <div> 배송비: {shippingFee.toLocaleString()}원</div>
      <div>총 결제 금액: {totalOrderPrice.toLocaleString()}원</div>
    </div>
  );
};
