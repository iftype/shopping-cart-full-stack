import { http, HttpResponse } from "msw";

export const deleteProductHandler = http.delete("*/products/:productId", () => {
  return new HttpResponse(null, { status: 204 });
});
