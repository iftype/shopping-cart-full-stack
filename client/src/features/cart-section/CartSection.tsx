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

      <div className={styles.checkboxRow}>
        <input
          id="check-all"
          type="checkbox"
          checked={isAllChecked}
          onChange={toggleAll}
        />
        <label htmlFor="check-all">전체선택</label>
        <span className={styles.checkCount}>({checks.length}/{totalCount})</span>
      </div>

      <hr className={styles.divider} />

      <div className={styles.list}>
        {cartItems.map((cartItem) => {
          const id = cartItem.product.id;
          return (
            <div key={id} className={styles.listItem}>
              <div className={styles.itemHeader}>
                <div className={styles.itemCheckbox}>
                  <input
                    type="checkbox"
                    checked={checks.includes(id)}
                    onChange={() => toggleSelect(id)}
                  />
                </div>
                <button className={styles.deleteButton} onClick={() => handleDelete(id)}>
                  삭제
                </button>
              </div>
              <CartItemComponent cartItem={cartItem} onQuantityChange={changeQuantity} />
            </div>
          );
        })}
      </div>
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
