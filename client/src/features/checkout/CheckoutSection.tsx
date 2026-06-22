import type { CartItem, Gift } from "../../entites/checkout/model";
import { CheckoutItemComponent } from "./CheckoutItem";
import styles from "./CheckoutSection.module.css";

interface CheckoutSectionProps {
  items: CartItem[];
  gifts: Gift[];
  onOpenCoupon: () => void;
}

export const CheckoutSection = ({ items, gifts, onOpenCoupon }: CheckoutSectionProps) => (
  <div className={styles.content}>
    <div className={styles.items}>
      {items.map((item) => {
        const gift = gifts.find((g) => g.productId === item.id);
        const giftQuantity = gift ? gift.quantity : 0;
        return <CheckoutItemComponent key={item.id} {...item} giftQuantity={giftQuantity} />;
      })}
    </div>

    <button className={styles.couponButton} onClick={onOpenCoupon}>
      쿠폰 적용
    </button>
  </div>
);
