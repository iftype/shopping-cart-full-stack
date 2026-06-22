import { useEffect, useState } from "react";
import { checkoutApi, type Checkout } from "../../entites/checkout/api";

type CheckoutState =
  | { status: "loading" }
  | { status: "success"; data: Checkout }
  | { status: "error"; error: string };

export const useCheckout = (
  checkedProductIds: number[],
  hardDeliveryPlace: boolean,
  selectedCouponIds: string[],
) => {
  const [state, setState] = useState<CheckoutState>({
    status: "loading",
  });

  useEffect(() => {
    if (checkedProductIds.length === 0) return;

    async function init() {
      try {
        const data = await checkoutApi({
          checked_product_list: checkedProductIds.map(String),
          hard_delivery_place: hardDeliveryPlace,
          selected_coupons: selectedCouponIds,
        });
        setState({
          status: "success",
          data,
        });
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }

        setState({
          status: "error",
          error: error.message,
        });
      }
    }
    init();
  }, [checkedProductIds, hardDeliveryPlace, selectedCouponIds]);

  return { state };
};
