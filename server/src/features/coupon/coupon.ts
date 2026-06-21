import { CouponEntity } from "./coupon.entity.js";
import { Bogo, Coupon, CouponProps, CouponResult, Fixed, LowPrice } from "./coupon.type.js";

interface FixedCouponProps {
  id: string;
  name: string;
  expiriationDate: Date;
  discountType: Fixed;
  rule: LowPrice;
}

export class FixedCoupon implements Coupon {
  readonly id: string;
  readonly name: string;
  readonly expiriationDate: Date;
  readonly discountType: Fixed;
  readonly rule: LowPrice;

  constructor(props: FixedCouponProps) {
    this.id = props.id;
    this.name = props.name;
    this.expiriationDate = props.expiriationDate;
    this.discountType = props.discountType;
    this.rule = props.rule;
  }

  static from(entity: CouponEntity): FixedCoupon {
    if (entity.discount_fixed === null || entity.limit_price === null) {
      throw new Error("쿠폰 데이터가 올바르지 않습니다");
    }
    return new FixedCoupon({
      id: entity.id,
      name: entity.name,
      expiriationDate: new Date(entity.expiriation_date),
      discountType: {
        type: "FIXED",
        discountFixed: entity.discount_fixed,
      },
      rule: { type: "LOW_PRICE", price: entity.limit_price },
    });
  }

  canUse({ summary }: CouponProps): boolean {
    if (new Date() > this.expiriationDate) return false;
    return summary.orderPrice >= this.rule.price;
  }

  execute(args: CouponProps): CouponResult {
    const discountPrice = args.summary.discountPrice + this.discountType.discountFixed;
    const { summary } = args;
    return {
      ...args,
      summary: {
        ...summary,
        discountPrice,
        totalPrice: summary.orderPrice - discountPrice + summary.deliveryPrice,
      },
    };
  }
}

interface BogoCouponProps {
  id: string;
  name: string;
  expiriationDate: Date;
  discountType: Bogo;
}

export class BogoCoupon implements Coupon {
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

  canUse({ checkoutCartList }: CouponProps): boolean {
    if (new Date() > this.expiriationDate) return false;
    return checkoutCartList.some((cart) => cart.quantity >= this.discountType.buyQuantity);
  }

  execute(args: CouponProps): CouponResult {
    const { buyQuantity, getQuantity } = this.discountType;
    const { checkoutCartList, summary, gifts } = args;
    const giftTarget = checkoutCartList
      .filter((cart) => cart.quantity >= buyQuantity)
      .sort((a, b) => b.price - a.price)[0];

    if (!giftTarget) return args;

    const discountPrice = summary.discountPrice + giftTarget.price * getQuantity;
    return {
      ...args,
      summary: {
        ...summary,
        discountPrice,
        totalPrice: summary.orderPrice - discountPrice + summary.deliveryPrice,
      },
      gifts: [...gifts, { productId: giftTarget.productId, quantity: getQuantity }],
    };
  }
}
