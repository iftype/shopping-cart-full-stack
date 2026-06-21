import type { CartItem } from "../../entites/cart/model";
import {
  calculateOrderPrice,
  calculateShippingFee,
  calculateTotalOrderPrice,
} from "../../entites/cart/model";
import { SummaryItem } from "../../shared/SummaryItem";
import styles from "./CartSummary.module.css";

interface CartSummaryProps {
  checkedItems: CartItem[];
}

export const CartSummary = ({ checkedItems }: CartSummaryProps) => {
  const orderPrice = calculateOrderPrice(checkedItems);
  const shippingFee = calculateShippingFee(orderPrice);
  const totalOrderPrice = calculateTotalOrderPrice(orderPrice, shippingFee);

  return (
    <div className={styles.container}>
      <SummaryItem title="주문금액" content={`${orderPrice.toLocaleString()}원`} />
      <SummaryItem title="배송비" content={`${shippingFee.toLocaleString()}원`} />
      <SummaryItem title="총결제금액" content={`${totalOrderPrice.toLocaleString()}원`} />
    </div>
  );
};
