import { http, HttpResponse } from "msw";
import { server } from "./mocks/node";

describe("MSW 예제 테스트", () => {
  it("GET /cart - 성공 케이스", async () => {
    const response = await fetch("/cart");
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.result).toBe("success");
    expect(json.data.cartItems[0].productName).toBe("상품이름A");
  });

  it("GET /cart - 서버 에러(500) 실패 케이스", async () => {
    server.use(
      http.get("*/cart", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const response = await fetch("/cart");
    expect(response.status).toBe(500);
  });
});
