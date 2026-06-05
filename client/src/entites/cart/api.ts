import type { CartItem } from "./model";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export interface CartItemDto {
  productId: number;
  productName: string;
  productImg: string;
  productPrice: number;
  quantity: number;
}

export const toCartItem = (cartItem: CartItemDto): CartItem => {
  return {
    product: {
      id: cartItem.productId,
      name: cartItem.productName,
      imgUrl: cartItem.productImg,
      price: cartItem.productPrice,
    },
    quantity: cartItem.quantity,
  };
};

export interface CartUpdateRequest {
  productId: number;
  quantity: number;
}

export interface CartErrorResponse {
  result: "error";
  message: string;
}

export const updateCart = async ({ productId, quantity }: CartUpdateRequest): Promise<void> => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    const error: CartErrorResponse = await response.json();
    throw new Error(error.message);
  }
};

export const getCart = async (): Promise<CartItem[]> => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error: CartErrorResponse = await response.json();
    throw new Error(error.message);
  }

  const json = await response.json();
  return json.data.cartItems.map(toCartItem);
};

export const deleteCartProduct = async (productId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error: CartErrorResponse = await response.json();
    throw new Error(error.message);
  }
};
