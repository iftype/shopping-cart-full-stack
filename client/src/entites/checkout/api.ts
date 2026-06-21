import type { CartItem, Coupon, Gift, Summary } from "./model";

export interface CheckoutProps {
  checked_product_list: string[];
  hard_delivery_place: boolean;
  selected_coupons: string[];
}

export interface CheckoutDto {
  price_summary: Summary;
  selected_items: CartItem[];
  coupons_info: Coupon[];
  best_coupons: string[];
  gifts: Gift[];
}

const BASE_URL = import.meta.env?.VITE_API_URL ?? "";

export const checkoutApi = async (props: CheckoutProps): Promise<CheckoutDto> => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  });
  if (!response.ok) {
    throw new Error("주문 정보 계산에 실패했습니다.");
  }
  const json = await response.json();
  return json;
};
