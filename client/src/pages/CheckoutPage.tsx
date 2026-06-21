import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useCheckout } from "../features/checkout/useCheckout";
import { Header } from "../shared/Header";
import { Spinner } from "../shared/Spinner";
import { ErrorInfo } from "../shared/ErrorInfo";
import { BottomButton } from "../shared/BottomButton";
import { Modal } from "../shared/Modal";
import { PageTitle } from "../shared/PageTitle";
import { CheckoutSection } from "../features/checkout/CheckoutSection";
import { DeliveryInfo } from "../features/checkout/DeliveryInfo";
import { CheckoutSummary } from "../features/checkout/CheckoutSummary";
import { CouponSelect } from "../features/checkout/CouponSelect";

const readCheckedProductIds = (): number[] => {
  const saved = localStorage.getItem("checked");
  return saved ? JSON.parse(saved) : [];
};

export const CheckoutPage = () => {
  const navigate = useNavigate();

  const [checkedProductIds] = useState(readCheckedProductIds);
  const { state } = useCheckout(checkedProductIds);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [hardDeliveryPlace, setHardDeliveryPlace] = useState(false);

  if (checkedProductIds.length === 0) {
    return <Navigate to="/" replace />;
  }

  const handleOrder = () => navigate("/result");

  return (
    <>
      <Header />
      {state.status === "loading" && <Spinner />}
      {state.status === "error" && <ErrorInfo message={state.error} />}
      {state.status === "success" && (
        <>
          <PageTitle
            title="주문 확인"
            subtitle={
              <>
                총 {state.data.selectedItems.length}종류의 상품{" "}
                {state.data.selectedItems.reduce((sum, item) => sum + item.quantity, 0)}개를
                주문합니다.
                <br />
                최종 결제 금액을 확인해 주세요.
              </>
            }
          />
          <CheckoutSection
            items={state.data.selectedItems}
            onOpenCoupon={() => setIsCouponModalOpen(true)}
          />
          <DeliveryInfo
            checked={hardDeliveryPlace}
            onToggle={() => setHardDeliveryPlace((prev) => !prev)}
          />
          <CheckoutSummary {...state.data.priceSummary} />
          <Modal isOpen={isCouponModalOpen} onClose={() => setIsCouponModalOpen(false)}>
            <CouponSelect
              coupons={state.data.couponsInfo}
              discountPrice={state.data.priceSummary.discountPrice}
              onApply={() => setIsCouponModalOpen(false)}
            />
          </Modal>
        </>
      )}
      <BottomButton onClick={handleOrder} text="결제하기" />
    </>
  );
};
