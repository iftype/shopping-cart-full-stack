import { CouponEntity } from "../coupon.entity.js";
import { Coupon, CouponProps, CouponResult, Bogo } from "../coupon.type.js";

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
