import { http, HttpResponse } from "msw";

export const deleteCartHandler = http.delete("*/cart/:productId", () => {
  return new HttpResponse(null, { status: 204 });
});
