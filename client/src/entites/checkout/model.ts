export type Summary = {
  order_price: number;
  dicount_price: number;
  delivery_price: number;
  total_price: number;
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
  expiriation_date: string;
  status: {
    type: "UNUSABLE" | "USABLE";
    message: string;
    apply: boolean;
  };
  discount: Discount;
};

export type Gift = {
  product_id: string;
  quantity: number;
};
