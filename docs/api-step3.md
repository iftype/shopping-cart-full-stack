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

```json
{
  id: "123-456-789",
  price_summary: {
    order_price: 70000
    dicount_price: 6000
    delivery_price: 3000
    total_price: 67000
  }
  hard_delivery_price: 3000,
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
  coupons_info:[
  {
    id: "FIXED5000",
    name: "5,000원 할인 쿠폰",
    expiriation_date: 2026-11-30,
    description: "최소 주문 금액: 100,000원",
    discount_fixed: 5000,
    discount_flat: null,
    status:{
      type: "USABLE",
      message: null,
    }
  },
  {
    id: "BOGO",
    name: "2+1 쿠폰",
    expiriation_date: 2026-06-30,
    description: "",
    discount_fixed: 4500,
    discount_flat: null,
    status:{
      type: "USABLE",
      message: null,
    }
  },
  {
    id: "FREESHIPPING",
    name: "무료 배송 쿠폰",
    expiriation_date: 2026-08-31,
    description: "최소 주문 금액: 50,000원",
    discount_fixed: 4500,
    discount_flat: null,
    status:{
      type: "USABLE",
      message: null,
    }
  },
  {
    id: "MIRACLESALE",
    name: "30% 시간제 할인 쿠폰",
    expiriation_date: 2026-07-31,
    description: "사용 가능 시간: 오전 4시부터 7시까지"
    discount_fixed: null,
    discount_flat: 30,
    status:{
      type: "UNUSABLE",
      message: "현재 사용 가능 시간이 아닙니다",
    }
  },
  ],
  bset_coupons: ["FIXED5000","FREESHIPPING"],
}
```

STATUS: 200

## API POST /api/orders/{order-id}/summary - 서버에서 주문 목록을 계산하고 요약을 보여준다

`FIXED5000` 와 `MIRACLESALE`를 사용햇을 떄, `FIXED5000`만 적용된 응답

### Body

```json
{
  "hard_delivery_place": true,
  "selected_coupons": ["FIXED5000", "MIRACLESALE"]
}
```

### Success Response

```json
{
  id: "123-456-789",
  price_summary: {
    order_price: 70000
    dicount_price: 6000
    delivery_price: 3000
    total_price: 67000
  }
  hard_delivery_price: 3000,
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
  coupons_info:[
  {
    id: "FIXED5000",
    name: "5,000원 할인 쿠폰",
    expiriation_date: 2026-11-30,
    description: "최소 주문 금액: 100,000원",
    discount_fixed: 5000,
    discount_flat: null,
    status:{
      type: "USABLE",
      message: null,
      apply: true,
    }
  },
  {
    id: "BOGO",
    name: "2+1 쿠폰",
    expiriation_date: 2026-06-30,
    description: "",
    discount_fixed: 4500,
    discount_flat: null,
    status:{
      type: "USABLE",
      message: null,
      apply: false,
    }
  },
  {
    id: "FREESHIPPING",
    name: "무료 배송 쿠폰",
    expiriation_date: 2026-08-31,
    description: "최소 주문 금액: 50,000원",
    discount_fixed: 4500,
    discount_flat: null,
    status:{
      type: "USABLE",
      message: null,
      apply: false,
    }
  },
  {
    id: "MIRACLESALE",
    name: "30% 시간제 할인 쿠폰",
    expiriation_date: 2026-07-31,
    description: "사용 가능 시간: 오전 4시부터 7시까지"
    discount_fixed: null,
    discount_flat: 30,
    status:{
      type: "UNUSABLE",
      message: "현재 사용 가능 시간이 아닙니다",
      apply: false,
    }
  },
  ],
  best_coupons: ["FIXED5000","FREESHIPPING"],
}
```

STATUS: 200

클라이언트는 `apply` 필드와 비교하여 적용됐는지 확인 할 수 있다

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

```

```
