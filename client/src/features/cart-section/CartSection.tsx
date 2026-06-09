import { CheckList, CheckListItem } from "../../shared/CheckBox";
import { useCartContext } from "./cartContext";
import { CartItemComponent } from "./CartItem";
import styles from "./CartSection.module.css";

export const CartSection = () => {
  const { cartItems, checks, toggleSelect, toggleAll, changeQuantity, handleDelete } =
    useCartContext();

  const totalCount = cartItems.length;
  const isAllChecked = totalCount > 0 && checks.length === totalCount;

  return (
    <div className={styles.content}>
      <div>
        <h2 className={styles.titleText}>장바구니</h2>
        <p className={styles.subtitle}>현재 {totalCount}종류의 상품이 담겨있습니다.</p>
      </div>

      <span className={styles.checkCount}>
        ({checks.length}/{totalCount})
      </span>
      <hr className={styles.divider} />
      <CheckList allChecked={isAllChecked} onToggleAll={toggleAll} label="전체선택">
        {cartItems.map((cartItem) => {
          const id = cartItem.product.id;
          return (
            <CheckListItem
              key={id}
              checked={checks.includes(id)}
              onToggle={() => toggleSelect(id)}
              onDelete={() => handleDelete(id)}
            >
              <CartItemComponent cartItem={cartItem} onQuantityChange={changeQuantity} />
            </CheckListItem>
          );
        })}
      </CheckList>
    </div>
  );
};

export const CartEmptySection = () => {
  return (
    <div className={styles.notice}>
      <p>장바구니에 담긴 상품이 없습니다.</p>
    </div>
  );
};
