export type Summary = {
  orderPrice: number;
  discountPrice: number;
  deliveryPrice: number;
  totalPrice: number;
};

export type CartItem = {
  id: string;
  product: {
    name: string;
    price: number;
    thumbnail: string;
  };
  quantity: number;
};

export type Discount = { type: "RATE"; rate: number } | { type: "FIXED"; amount: number };

export type Coupon = {
  id: string;
  name: string;
  expirationDate: string;
  status: {
    type: "UNUSABLE" | "USABLE";
    message: string;
    apply: boolean;
  };
  discount: Discount;
};

export type Gift = {
  productId: string;
  quantity: number;
};

export type OrderResult = {
  items: CartItem[];
  gifts: Gift[];
  totalPrice: number;
};

const couponDiscount = (payable: number, coupon: Coupon): number =>
  coupon.discount.type === "FIXED"
    ? coupon.discount.amount
    : Math.floor((payable * coupon.discount.rate) / 100);

export const calculateDiscount = (coupons: Coupon[], orderPrice: number): number => {
  const fixed = coupons.filter((coupon) => coupon.discount.type === "FIXED");
  const rate = coupons.filter((coupon) => coupon.discount.type === "RATE");
  const payable = [...fixed, ...rate].reduce(
    (price, coupon) => price - couponDiscount(price, coupon),
    orderPrice,
  );
  return orderPrice - payable;
};
