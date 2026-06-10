import type { InMemoryDB } from "./in-memory-db.js";
import { DEFAULT_IMAGE } from "../assets/config.js";

export function seed(db: InMemoryDB): void {
  db.PRODUCT_TABLE.push(
    { id: 1, name: "베이직 코튼 티셔츠", price: 19900, imgUrl: DEFAULT_IMAGE },
    { id: 2, name: "슬림핏 청바지", price: 49900, imgUrl: DEFAULT_IMAGE },
    { id: 3, name: "오버핏 후드티", price: 39900, imgUrl: DEFAULT_IMAGE },
    { id: 4, name: "캐주얼 반팔 셔츠", price: 29900, imgUrl: DEFAULT_IMAGE },
    { id: 5, name: "스트라이프 롱슬리브", price: 24900, imgUrl: DEFAULT_IMAGE }
  );

  db.CART_TABLE.push(
    { product_id: 1, quantity: 2 },
    { product_id: 3, quantity: 1 },
    { product_id: 5, quantity: 3 }
  );
}
