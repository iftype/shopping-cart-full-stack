import { http, HttpResponse } from "msw";
import { PRODUCTS } from "./mock-data";

export const getProductsHandler = http.get("*/products", () => {
  return HttpResponse.json({
    result: "success",
    data: {
      products: PRODUCTS,
    },
  });
});
