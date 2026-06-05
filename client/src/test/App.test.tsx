import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders without crashing", async () => {
    render(<App />);

    // 현재 App.tsx는 빈 껍데기이므로 렌더링 시 오류가 안 나는지만 검증
    // 나중에 App.tsx에 장바구니 UI를 조립하면 화면 요소가 올바르게 나오는지 검사할 수 있습니다.
    expect(true).toBe(true);
  });
});
