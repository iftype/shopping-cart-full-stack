import { type CartItem } from "../../entites/checkout/model";
import styles from "./CheckoutItem.module.css";

export const CheckoutItemComponent = (props: CartItem) => {
  const { product, quantity } = props;
  const { price, name, thumbnail } = product;

  return (
    <div className={styles.body}>
      <div className={styles.imgBox}>
        <img src={thumbnail} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price.toLocaleString()}원</div>
        <div>{quantity}개</div>
      </div>
    </div>
  );
};
