import { SummaryContainer, SummaryItem } from "../../shared/Summary";

interface CheckoutSummaryProps {
  orderPrice: string;
  shippingFee: string;
  discountPrice: string;
  totalOrderPrice: string;
}

export const CheckoutSummary = (props: CheckoutSummaryProps) => {
  const { orderPrice, shippingFee, discountPrice, totalOrderPrice } = props;

  return (
    <SummaryContainer>
      <SummaryItem title="주문 금액" content={`${orderPrice.toLocaleString()}원`} />
      <SummaryItem title="쿠폰 할인 금액" content={`${discountPrice.toLocaleString()}원`} />
      <SummaryItem title="배송비" content={`${shippingFee.toLocaleString()}원`} />
      <SummaryItem title="총 결제금액" content={`${totalOrderPrice.toLocaleString()}원`} />
    </SummaryContainer>
  );
};
