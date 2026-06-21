export interface CouponEntity {
  id: string; // 아이디
  name: string; // 이름
  expiriation_date: string; // 만료일

  rule_type: "LOW_PRICE" | "TIME";
  limit_price: number | null; // 최소금액
  start_date: Date | null; // 시작날짜 (조건)
  end_date: Date | null; // 끝 날짜 (조건)

  discount_type: "FIXED" | "BOGO" | "FREESHIPPING" | "MIRACLESALE"; // 어떻게 타입시스템으로만들지
  discount_fixed: number | null; // 할인금액
  discount_rate: number | null; // 할인 퍼센트
  gift: number | null; // 증정 상품 id
  gift_quantity: number | null; // 증정 수량
}
