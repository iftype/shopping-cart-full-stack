import { http, HttpResponse } from "msw";

export const postProductHandler = http.post<
  never,
  { name: string; price: number; imgUrl?: string }
>("*/products", async ({ request }) => {
  const { name, price, imgUrl } = await request.json();

  return HttpResponse.json(
    {
      result: "success",
      data: {
        id: 3,
        name,
        price,
        imgUrl: imgUrl || "default.png",
      },
    },
    { status: 201 },
  );
});
