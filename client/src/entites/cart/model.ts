export interface CartItem {
  productId: number;
  productName: string;
  productImg: string;
  productPrice: number;
  quantity: number;
}

export const FREE_SHIPPING_THRESHOLD = 100000;
export const SHIPPING_FEE = 3000;

export const calculateOrderPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
};

export const calculateShippingFee = (orderPrice: number) => {
  if (orderPrice === 0 || orderPrice >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
};

export const calculateTotalOrderPrice = (orderPrice: number, shippingFee: number): number => {
  return orderPrice + shippingFee;
};
