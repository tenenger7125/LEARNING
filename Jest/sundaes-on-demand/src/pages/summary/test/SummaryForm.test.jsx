import { screen, render, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("요약 폼에서의 이용약관과 버튼 활성화", () => {
  test("초기 요약 폼 상태는 체크박스 비활성화시 버튼 비활성화", () => {
    render(<SummaryForm />);

    const $button = screen.getByRole("button", { name: /confirm order/i });
    const $checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });

    expect($checkbox).not.toBeChecked();
    expect($button).toBeDisabled();
  });

  test("체크박스 체크 또는 해제시 버튼 활성화/비활성화 유무", () => {
    render(<SummaryForm />);

    const $button = screen.getByRole("button", { name: /confirm order/i });
    const $checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });

    // 체크박스 체크시
    fireEvent.click($checkbox);
    expect($checkbox).toBeChecked();
    expect($button).toBeEnabled();

    // 체크박스 체크안했을시
    fireEvent.click($checkbox);
    expect($checkbox).not.toBeChecked();
    expect($button).toBeDisabled();
  });
});
