import { BrowserRouter, Route, Routes } from "react-router";
import { CartPage } from "./pages/CartPage";
import { ResultPage } from "./pages/ResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CartPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
