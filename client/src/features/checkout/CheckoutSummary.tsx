import { SummaryContainer, SummaryItem } from "../../shared/Summary";

interface CheckoutSummaryProps {
  order_price: number;
  delivery_price: number;
  dicount_price: number;
  total_price: number;
}

export const CheckoutSummary = (props: CheckoutSummaryProps) => {
  const { order_price, dicount_price, delivery_price, total_price } = props;

  return (
    <SummaryContainer>
      <SummaryItem title="주문 금액" content={`${order_price.toLocaleString()}원`} />
      <SummaryItem title="쿠폰 할인 금액" content={`${dicount_price.toLocaleString()}원`} />
      <SummaryItem title="배송비" content={`${delivery_price.toLocaleString()}원`} />
      <SummaryItem title="총 결제금액" content={`${total_price.toLocaleString()}원`} />
    </SummaryContainer>
  );
};
