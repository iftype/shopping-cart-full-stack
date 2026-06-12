## `POST` `/api/orders/` - 임시 주문서를 만든다.

### Body

```
[
  {
    product_id: "123",
    quantity: 2
  },
  {
    product_id: "456",
    quantity: 5
  }
]
```

### Success Response

```
{
  order_id: "123123"
}
```

STATUS: 201

## `GET` `/api/orders/{order_id}/` - 특정 임시 주문서를 가져온다.

### Success Response

```
{
  id: "123-456-789",
  hard_delivery_place: false,
  selected_coupons: [FIXED5000, BOGO],
  selected_items: [
    {
      id: "123"
      product: {
        name: "투썸 아이스크림"
        price: 4000
        thumbnail: "ice.png"
      }
      quantity: 2
    },
    {
      id: "456"
      product: {
        name: "투썸 초코 아이스크림"
        price: 4500
        thumbnail: "ice-choco.png"
      }
      quantity: 5
    }
  ],
  price_summary: {
    order_price: 70000
    dicount_price: 6000
    delivery_price: 3000
    total_price: 67000
  }
}
```

STATUS: 200

## `GET` `/api/coupons/`- 쿠폰 데이터를 가져온다.

### Success Response

```
[
  {
    id: "FIXED5000",
    name: "5,000원 할인 쿠폰",
    expiriation_date: 2026-11-30,
    description: "최소 주문 금액: 100,000원"
  },
  {
    id: "BOGO",
    name: "2+1 쿠폰",
    expiriation_date: 2026-06-30,
    description: ""
  },
  {
    id: "FREESHIPPING",
    name: "무료 배송 쿠폰",
    expiriation_date: 2026-08-31,
    description: "최소 주문 금액: 50,000원"
  },
  {
    id: "MIRACLESALE",
    name: "30% 시간제 할인 쿠폰",
    expiriation_date: 2026-07-31,
    description: "사용 가능 시간: 오전 4시부터 7시까지"
  },
]
```

STATUS: 200

## `POST` `/api/coupons/discount-summary/` - 쿠폰 할인 예상 금액을 반환한다.

### Body

```
{
  order_id: "123-456-789",
  coupon_id: ["BOGO", "FREESHIPPING"]
}
```

### Success Response

```
{
  selected_coupons: ["BOGO", "FREESHIPPING"],
  coupon_discount_price: 5000
}
```

STATUS: 200

## `PATCH` `/api/order/{orderId}/` - 임시 주문서를 수정한다.

### Body

```
{
  hard_delivery_place: true
}
```

```
{
  selected_coupons: ["FREESHIPPING"]
}
```

### Success Response

```
{
  id: "123-456-789",
  hard_delivery_place: true,
  selected_coupons: [FREESHIPPING],
  selected_items: [
    {
      id: "123"
      product: {
        name: "투썸 아이스크림"
        price: 4000
        thumbnail: "ice.png"
      }
      quantity: 2
    },
    {
      id: "456"
      product: {
        name: "투썸 초코 아이스크림"
        price: 4500
        thumbnail: "ice-choco.png"
      }
      quantity: 5
    }
  ],
  price_summary: {
    order_price: 70000
    dicount_price: 6000
    delivery_price: 3000
    total_price: 67000
  }
}
```

STATUS: 201

## `POST` `/api/payment/` - 영수증을 생성한다.

### Body

```
{
  order_id: "123-456-789",
}
```

### Success Response

```
{
  receipt_id: "123-456",
}
```

STATUS: 201
