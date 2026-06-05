import { type CartItem, MIN_QUANTITY } from "../../entites/cart/model";

export interface CartItemComponentProps {
  cartItem: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
}

export const CartItemComponent = ({ cartItem, onQuantityChange }: CartItemComponentProps) => {
  const { product, quantity } = cartItem;
  const { id, price, name, imgUrl } = product;

  return (
    <div>
      <div>
        <img src={imgUrl} />
      </div>

      <div>{name}</div>
      <div>{price.toLocaleString()}원</div>
      <div>
        <button
          onClick={() => onQuantityChange(id, quantity - 1)}
          disabled={quantity <= MIN_QUANTITY}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => onQuantityChange(id, quantity + 1)}>+</button>
      </div>
    </div>
  );
};
