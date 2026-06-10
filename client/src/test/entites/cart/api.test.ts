import { http, HttpResponse } from "msw";
import { server } from "../../mocks/node";
import { getCarts } from "../../../entites/cart/api";

describe("cart api 에러 처리", () => {
  it("서버 에러가 오면 서버 message로 throw 한다", async () => {
    server.use(
      http.get("*/cart", () =>
        HttpResponse.json({ result: "error", message: "에러가 발생했습니다." }, { status: 500 }),
      ),
    );

    await expect(getCarts()).rejects.toThrow("에러가 발생했습니다.");
  });

  it("네트워크가 끊기면 throw 한다", async () => {
    server.use(http.get("*/cart", () => HttpResponse.error()));

    await expect(getCarts()).rejects.toThrow();
  });
});
