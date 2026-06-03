import { http, HttpResponse } from "msw";
import { CART } from "./mock-data";

export const getCartHandler = http.get("*/cart", () => {
  return HttpResponse.json({
    result: "success",
    data: {
      cartItems: CART,
    },
  });
});
