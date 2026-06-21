export type Summary = {
  orderPrice: number;
  discountPrice: number;
  deliveryPrice: number;
  totalPrice: number;
};

export type CartItem = {
  id: string;
  product: {
    name: string;
    price: number;
    thumbnail: string;
  };
  quantity: number;
};

export type Discount = { type: "RATE"; rate: number } | { type: "FIXED"; amount: number };

export type Coupon = {
  id: string;
  name: string;
  expirationDate: string;
  status: {
    type: "UNUSABLE" | "USABLE";
    message: string;
    apply: boolean;
  };
  discount: Discount;
};

export type Gift = {
  productId: string;
  quantity: number;
};
