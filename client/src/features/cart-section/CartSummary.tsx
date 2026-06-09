import type { CartItem } from "../../entites/cart/model";
import {
  calculateOrderPrice,
  calculateShippingFee,
  calculateTotalOrderPrice,
} from "../../entites/cart/model";
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
      <div className={styles.item}>
        <span className={styles.itemTitle}>주문금액</span>
        <span className={styles.itemContent}>{orderPrice.toLocaleString()}원</span>
      </div>
      <div className={styles.item}>
        <span className={styles.itemTitle}>배송비</span>
        <span className={styles.itemContent}>{shippingFee.toLocaleString()}원</span>
      </div>
      <div className={styles.item}>
        <span className={styles.itemTitle}>총결제금액</span>
        <span className={styles.itemContent}>{totalOrderPrice.toLocaleString()}원</span>
      </div>
    </div>
  );
};
