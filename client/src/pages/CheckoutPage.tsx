import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useCheckout } from "../features/checkout/useCheckout";
import { Header } from "../shared/Header";
import { Spinner } from "../shared/Spinner";
import { ErrorInfo } from "../shared/ErrorInfo";
import { BottomButton } from "../shared/BottomButton";

const readCheckedProductIds = (): number[] => {
  const saved = localStorage.getItem("checked");
  return saved ? JSON.parse(saved) : [];
};

export const CheckoutPage = () => {
  const [checkedProductIds] = useState(readCheckedProductIds);
  const { state } = useCheckout(checkedProductIds);
  const navigate = useNavigate();

  if (checkedProductIds.length === 0) {
    return <Navigate to="/" replace />;
  }
  console.log(state);

  const handleOrder = () => navigate("/result");

  return (
    <>
      <Header />
      {state.status === "loading" && <Spinner />}
      {state.status === "error" && <ErrorInfo message={state.error} />}
      {state.status === "success" && <div>결제해야함 모달이랑 이것저것!</div>}
      <BottomButton onClick={handleOrder} text="결제하기" />
    </>
  );
};
