import { type CartItem, MAX_QUANTITY, MIN_QUANTITY } from "../../entites/cart/model";
import styles from "./CartItem.module.css";

export interface CartItemComponentProps {
  cartItem: CartItem;
  isMutating: boolean;
  onQuantityChange: (id: number, quantity: number) => void;
}

export const CartItemComponent = ({
  cartItem,
  isMutating,
  onQuantityChange,
}: CartItemComponentProps) => {
  const { product, quantity } = cartItem;
  const { id, price, name, imgUrl } = product;

  return (
    <div className={styles.body}>
      <div className={styles.imgBox}>
        <img src={imgUrl} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price.toLocaleString()}원</div>
        <div className={styles.stepper}>
          <button
            className={styles.stepperBtn}
            onClick={() => onQuantityChange(id, quantity - 1)}
            disabled={isMutating || quantity <= MIN_QUANTITY}
          >
            -
          </button>
          <span className={styles.stepperValue}>{quantity}</span>
          <button
            className={styles.stepperBtn}
            onClick={() => onQuantityChange(id, quantity + 1)}
            disabled={isMutating || quantity >= MAX_QUANTITY}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
