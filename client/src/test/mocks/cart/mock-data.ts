import type { CartItem } from "../../../entites/cart/model";

export const CART: CartItem[] = [
  {
    product: { id: 1, name: "상품이름A", imgUrl: "/test.png", price: 30000 },
    quantity: 1,
  },
  {
    product: { id: 2, name: "상품이름B", imgUrl: "/test.png", price: 40000 },
    quantity: 2,
  },
];




