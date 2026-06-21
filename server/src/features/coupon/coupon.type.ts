export interface Coupon {
  id: string; // 아이디
  name: string; // 이름
  expiriationDate: Date; // 만료일
  DiscountType: DiscountType;
  rule?: LowPrice | Time;

  canUse: (args: CouponProps) => boolean;
  execute: (args: CouponProps) => CouponResult;
}
type LowPrice = { type: "LOW_PRICE"; price: number };
type Time = { type: "TIME"; startAt: string; endAt: string };

type CheckoutCart = {
  productId: string;
  quantity: number;
  price: number;
};

type Summary = {
  orderPrice: number;
  discountPrice: number;
  deliveryPrice: number;
  totalPrice: number;
};
type Gift = {
  productId: string;
  quantity: number;
};

export interface CouponProps {
  checkoutCartList: CheckoutCart[];
  summary: Summary;
  gifts: Gift[];
}
export interface CouponResult {
  checkoutCartList: CheckoutCart[];
  summary: Summary;
  gifts: Gift[];
}

export interface Fixed {
  type: "FIXED";
  discountFixed: number; // 할인금액
  rule: LowPrice;
}
export interface Bogo {
  type: "BOGO";
  gift: number;
  giftQuantity: number;
}
interface FressShipping {
  type: "FREESHIPPING";
}

interface Miralces {
  type: "MIRACLESALE";
  discountRate: number; // 할인 퍼센트
  rule: Time;
}

export type DiscountType = Fixed | Bogo | FressShipping | Miralces;
