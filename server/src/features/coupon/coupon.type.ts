export interface Coupon {
  id: string; // 아이디
  name: string; // 이름
  expiriationDate: Date; // 만료일
  discountType: DiscountType;
  rule?: LowPrice | Time;

  canUse: (args: CouponProps) => boolean;
  execute: (args: CouponProps) => CouponResult;
}
export type LowPrice = { type: "LOW_PRICE"; price: number };
export type Time = { type: "TIME"; startAt: string; endAt: string };

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
}
export interface Bogo {
  type: "BOGO";
  buyQuantity: number;
  getQuantity: number;
}
export interface FreeShipping {
  type: "FREESHIPPING";
}

export interface Miralces {
  type: "MIRACLESALE";
  discountRate: number; // 할인 퍼센트
}

export type DiscountType = Fixed | Bogo | FreeShipping | Miralces;
