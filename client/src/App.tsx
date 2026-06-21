import { BrowserRouter, Route, Routes } from "react-router";
import { CartPage } from "./pages/CartPage";
import { ResultPage } from "./pages/ResultPage";
import { PaymentPage } from "./pages/PaymentPage";
import { CheckoutPage } from "./pages/CheckoutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CartPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
