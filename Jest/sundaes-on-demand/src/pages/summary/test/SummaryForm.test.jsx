import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("요약 폼에서의 이용약관과 버튼 활성화", () => {
  it("초기 요약 폼 상태는 체크박스 비활성화시 버튼 비활성화", () => {
    render(<SummaryForm />);

    const $button = screen.getByRole("button", { name: /confirm order/i });
    const $checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });

    expect($checkbox).not.toBeChecked();
    expect($button).toBeDisabled();
  });

  it("체크박스 체크 또는 해제시 버튼 활성화/비활성화 유무", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const $button = screen.getByRole("button", { name: /confirm order/i });
    const $checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });

    // 체크박스 체크시
    await user.click($checkbox);
    expect($checkbox).toBeChecked();
    expect($button).toBeEnabled();

    // 체크박스 체크안했을시
    await user.click($checkbox);
    expect($checkbox).not.toBeChecked();
    expect($button).toBeDisabled();
  });
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);

  // popover가 사라질 수 있도록 충분한 시간 이후에 체크를 해야한다. waitFor
  await waitFor(() => {
    expect(popover).not.toBeInTheDocument();
  });
});
