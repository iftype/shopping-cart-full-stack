import { http, HttpResponse } from "msw";

export const patchCartHandler = http.patch<{ productId: string }, { quantity: number }>(
  "*/cart/:productId",
  async ({ params, request }) => {
    const { quantity } = await request.json();

    return HttpResponse.json({
      result: "success",
      data: {
        productId: Number(params.productId),
        quantity,
      },
    });
  },
);
