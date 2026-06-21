import { Request, Response } from "express";
import type CheckoutService from "./checkout.service.js";
import type { CouponInfo } from "./checkout.service.js";
import { BadRequestError } from "../../errors/http-error.js";

export default class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  checkout = async (req: Request, res: Response) => {
    const { checked_product_list, hard_delivery_place, selected_coupons } = req.body;

    if (!Array.isArray(checked_product_list)) {
      throw new BadRequestError("요청 형식이 올바르지 않습니다.");
    }

    const result = await this.checkoutService.checkout({
      checkedProductIds: checked_product_list.map(String),
      hardDeliveryPlace: Boolean(hard_delivery_place),
      selectedCouponIds: Array.isArray(selected_coupons) ? selected_coupons.map(String) : [],
    });

    res.status(200).json({
      price_summary: {
        order_price: result.summary.orderPrice,
        dicount_price: result.summary.discountPrice,
        delivery_price: result.summary.deliveryPrice,
        total_price: result.summary.totalPrice,
      },
      // hard_delivery_price: result.hardDeliveryPrice,
      selected_items: result.selectedItems.map((item) => ({
        id: item.id,
        product: { name: item.name, price: item.price, thumbnail: item.thumbnail },
        quantity: item.quantity,
      })),
      coupons_info: result.coupons.map((status) => this.toCouponInfo(status)),
      best_coupons: result.bestCouponIds,
    });
  };

  private toCouponInfo({ coupon, status }: CouponInfo) {
    const discount = coupon.discountType;
    return {
      id: coupon.id,
      name: coupon.name,
      expiriation_date: coupon.expiriationDate,
      status,
      discount_rate: "discountRate" in discount ? discount.discountRate : null,
      discount_fixed: "discountFixed" in discount ? discount.discountFixed : null,
    };
  }
}
