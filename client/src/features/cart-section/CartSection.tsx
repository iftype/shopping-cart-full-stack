import { useCartContext } from "./cartContext";
import { CartItemComponent } from "./CartItem";

export const CartSection = () => {
  const { cartItems, checks, toggleSelect, toggleAll, changeQuantity, handleDelete } =
    useCartContext();

  const totalCount = cartItems.length;
  const isAllChecked = totalCount > 0 && checks.length === totalCount;

  return (
    <>
      <div>
        <h2>장바구니</h2>
        <p>현재 {totalCount}종류의 상품이 담겨있습니다.</p>
      </div>

      <div>
        <div>
          <label>
            <input type="checkbox" checked={isAllChecked} onChange={toggleAll} />
            <span>전체선택</span>
          </label>
          <span>
            ({checks.length}/{totalCount})
          </span>
        </div>

        <div>
          {cartItems.map((cartItem) => {
            const id = cartItem.product.id;
            return (
              <div key={id}>
                <input
                  type="checkbox"
                  checked={checks.includes(id)}
                  onChange={() => toggleSelect(id)}
                />
                <div>
                  <CartItemComponent cartItem={cartItem} onQuantityChange={changeQuantity} />
                </div>
                <button onClick={() => handleDelete(id)}>삭제</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const CartEmptySection = () => {
  return (
    <div>
      <h2>장바구니</h2>
      <p>장바구니에 담긴 상품이 없습니다.</p>
    </div>
  );
};
