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

export type Rule =
  | { type: "LOW_PRICE"; price: number }
  | { type: "TIME"; startAt: string; endAt: string };

export type Coupon = {
  id: string;
  name: string;
  expirationDate: string;
  rule?: Rule;
  status: {
    type: "UNUSABLE" | "USABLE";
    message: string;
    apply: boolean;
  };
  discount: Discount;
};

// "HH:MM" -> "오전/오후 N시" (분이 있으면 "N시 M분")
const formatHour = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0 ? `${period} ${hour12}시` : `${period} ${hour12}시 ${minute}분`;
};

// 쿠폰 사용 조건을 한국어 안내 문구로 변환 (조건 없는 쿠폰은 null)
export const couponRuleText = (rule: Rule | null): string | null => {
  if (!rule) return null;
  if (rule.type === "LOW_PRICE") return `최소 주문 금액: ${rule.price.toLocaleString()}원`;
  return `사용 가능 시간: ${formatHour(rule.startAt)}부터 ${formatHour(rule.endAt)}까지`;
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
