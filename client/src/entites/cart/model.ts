import type { Product } from "../product/model";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const FREE_SHIPPING_THRESHOLD = 100000;
export const SHIPPING_FEE = 3000;
export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

export const isValidQuantity = (quantity: number): boolean => {
  return quantity >= MIN_QUANTITY;
};

export const calculateOrderPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const calculateShippingFee = (orderPrice: number) => {
  if (orderPrice === 0 || orderPrice >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
};

export const calculateTotalOrderPrice = (orderPrice: number, shippingFee: number): number => {
  return orderPrice + shippingFee;
};
