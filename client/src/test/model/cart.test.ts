import {
  calculateOrderPrice,
  calculateShippingFee,
  calculateTotalOrderPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  type CartItem,
} from "../../entites/cart/model";

const CART_MOCK: CartItem[] = [
  {
    productId: 1,
    productName: "상품이름A",
    productImg: "test.png",
    productPrice: 30000,
    quantity: 1,
  },
  {
    productId: 2,
    productName: "상품이름B",
    productImg: "test.png",
    productPrice: 40000,
    quantity: 2,
  },
];

describe("cart 계산 함수 테스트", () => {
  it("장바구니의 총 합을 계산한다 ", () => {
    const orderPrice = calculateOrderPrice(CART_MOCK);
    const result =
      CART_MOCK[0].productPrice * CART_MOCK[0].quantity +
      CART_MOCK[1].productPrice * CART_MOCK[1].quantity;

    expect(orderPrice).toBe(result);
  });

  it("초기값은 배송비가 0원입니다", () => {
    const shippingFee = calculateShippingFee(0);
    expect(shippingFee).toBe(0);
  });

  it("10만원이 넘으면 배송비가 0원입니다", () => {
    const shippingFee = calculateShippingFee(FREE_SHIPPING_THRESHOLD);
    expect(shippingFee).toBe(0);
  });

  it("기준 못넘으면 배송비가 {SHIPPING_FEE}원입니다", () => {
    const shippingFee = calculateShippingFee(FREE_SHIPPING_THRESHOLD - 1);
    expect(shippingFee).toBe(SHIPPING_FEE);
  });

  it("총 주문 금액 구하기 ", () => {
    const orderPrice = calculateOrderPrice(CART_MOCK);
    const shippingFee = calculateShippingFee(orderPrice);
    const totalOrderPrice = calculateTotalOrderPrice(orderPrice, shippingFee);
    expect(totalOrderPrice).toBe(110000);
  });
});
