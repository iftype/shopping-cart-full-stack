import { formatDate } from "../../shared/date";
import type { CartItem, Checkout, Coupon, Discount, Rule } from "./model";

export interface CheckoutRequest {
  checkedProductIds: number[];
  hardDeliveryPlace: boolean;
  selectedCouponIds: string[];
}

interface CheckoutProps {
  checked_product_list: string[];
  hard_delivery_place: boolean;
  selected_coupons: string[];
}

interface CheckoutDto {
  price_summary: {
    order_price: number;
    dicount_price: number;
    delivery_price: number;
    total_price: number;
  };
  selected_items: CartItem[];
  coupons_info: {
    id: string;
    name: string;
    expiriation_date: string;
    rule?: Rule;
    status: Coupon["status"];
    discount: Discount;
  }[];
  best_coupons: string[];
  gifts: { product_id: string; quantity: number }[];
}

const BASE_URL = import.meta.env?.VITE_API_URL ?? "";

const toCheckoutDto = (req: CheckoutRequest): CheckoutProps => ({
  checked_product_list: req.checkedProductIds.map(String),
  hard_delivery_place: req.hardDeliveryPlace,
  selected_coupons: req.selectedCouponIds,
});

const toCheckout = (res: CheckoutDto): Checkout => ({
  priceSummary: {
    orderPrice: res.price_summary.order_price,
    discountPrice: res.price_summary.dicount_price,
    deliveryPrice: res.price_summary.delivery_price,
    totalPrice: res.price_summary.total_price,
  },
  selectedItems: res.selected_items.map((item) => ({
    id: item.id,
    product: {
      name: item.product.name,
      price: item.product.price,
      thumbnail: item.product.thumbnail,
    },
    quantity: item.quantity,
  })),
  couponsInfo: res.coupons_info.map((coupon) => ({
    id: coupon.id,
    name: coupon.name,
    expirationDate: formatDate(coupon.expiriation_date),
    rule: coupon.rule,
    status: {
      type: coupon.status.type,
      message: coupon.status.message,
      apply: coupon.status.apply,
    },
    discount: coupon.discount,
  })),
  bestCoupons: res.best_coupons,
  gifts: res.gifts.map((gift) => ({
    productId: gift.product_id,
    quantity: gift.quantity,
  })),
});

export const checkoutApi = async (req: CheckoutRequest): Promise<Checkout> => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toCheckoutDto(req)),
  });
  if (!response.ok) {
    throw new Error("주문 정보 계산에 실패했습니다.");
  }
  const json: CheckoutDto = await response.json();
  return toCheckout(json);
};
