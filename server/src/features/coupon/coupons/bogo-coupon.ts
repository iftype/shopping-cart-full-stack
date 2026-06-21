import { CouponEntity } from "../coupon.entity.js";
import {
  Coupon,
  CouponProps,
  CouponResult,
  Bogo,
  CouponStatus,
  DiscountView,
} from "../coupon.type.js";

interface BogoCouponProps {
  id: string;
  name: string;
  expiriationDate: Date;
  discountType: Bogo;
}

export default class BogoCoupon implements Coupon {
  readonly id: string;
  readonly name: string;
  readonly expiriationDate: Date;
  readonly discountType: Bogo;

  constructor(props: BogoCouponProps) {
    this.id = props.id;
    this.name = props.name;
    this.expiriationDate = props.expiriationDate;
    this.discountType = props.discountType;
  }

  static from(entity: CouponEntity): BogoCoupon {
    return new BogoCoupon({
      id: entity.id,
      name: entity.name,
      expiriationDate: new Date(entity.expiriation_date),
      discountType: { type: "BOGO", buyQuantity: 2, getQuantity: 1 },
    });
  }

  canUse({ checkoutCartList }: CouponProps): CouponStatus {
    if (new Date() > this.expiriationDate)
      return { type: "UNUSABLE", message: `만료일: ${this.expiriationDate}` };
    if (!checkoutCartList.some((cart) => cart.quantity >= this.discountType.buyQuantity))
      return { type: "UNUSABLE", message: "2개 이상이여야 사용할 수 있는 쿠폰입니다" };

    return { type: "USABLE", message: "" };
  }

  discountView(): DiscountView {
    return { type: "FIXED", amount: 0 };
  }

  execute(args: CouponProps): CouponResult {
    const { buyQuantity, getQuantity } = this.discountType;
    const { checkoutCartList, gifts } = args;
    const giftTarget = checkoutCartList
      .filter((cart) => cart.quantity >= buyQuantity)
      .sort((a, b) => b.price - a.price)[0];

    if (!giftTarget) return args;

    return {
      ...args,
      gifts: [...gifts, { productId: giftTarget.productId, quantity: getQuantity }],
    };
  }
}
