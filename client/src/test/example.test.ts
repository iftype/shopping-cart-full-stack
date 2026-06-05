import { getCart } from "../entites/cart/api";

describe("MSW API 모킹 테스트", () => {
  it("GET /cart - 장바구니 목록을 성공적으로 받아온다", async () => {
    const data = await getCart();
    
    expect(data).toHaveLength(2);
    expect(data[0].product.name).toBe("상품이름A");
    expect(data[1].product.name).toBe("상품이름B");
  });
});


