import { http, HttpResponse } from "msw";
import { CART } from "./mock-data";
import type { CartItemDto } from "../../../entites/cart/api";

export const getCartHandler = http.get("*/cart", () => {
  // 모의 DB 데이터(CART)를 실제 서버 DTO 규격으로 매핑하여 반환
  const cartItemsDto: CartItemDto[] = CART.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    productImg: item.product.imgUrl,
    productPrice: item.product.price,
    quantity: item.quantity,
  }));

  return HttpResponse.json({
    result: "success",
    data: {
      cartItems: cartItemsDto,
    },
  });
});

