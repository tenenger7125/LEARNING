import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

// expect 단언문은 하나만 하는게 좋다.
// 여러개를 사용하여 단언문을 확장하는 경우는 기능 테스트할 때 유용하다.

test("button has correct initial color, text and update when clicked", () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to Midnight Blue'
  const $button = screen.getByRole("button", { name: "Change to Midnight Blue" });

  // expect the background color to be MediumVioletRed
  expect($button).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click($button);

  // expect the background color to be MidnightBlue
  expect($button).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to Medium Violet Red'
  expect($button).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const $button = screen.getByRole("button", { name: "Change to Midnight Blue" });
  expect($button).toBeEnabled();

  // check that the checkbox start out unchecked
  const $checkbox = screen.getByRole("checkbox");
  expect($checkbox).not.toBeChecked();
});

test("체크박스가 체크되어있지 않으면 버튼이 활성화, 체크박스가 체크되어 있으면 버튼이 비활성화", () => {
  render(<App />);

  const $button = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const $checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect($checkbox).not.toBeChecked();
  expect($button).toBeEnabled();

  fireEvent.click($checkbox);
  expect($checkbox).toBeChecked();
  expect($button).toBeDisabled();
});

test("초기상태에서 체크박스가 비활성화이면 빨간색이고, 버튼을 클릭하면 색깔이 파란색으로 변하고 체크박스를 활성화하면 색상은 회색으로 변한다. 그리고 체크박스를 비활성화하면 버튼 색깔은 파란색으로 변한다.", () => {
  render(<App />);

  const $button = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const $checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect($checkbox).not.toBeChecked();
  expect($button).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click($button);
  expect($button).toHaveStyle({ backgroundColor: "MidnightBlue" });

  fireEvent.click($checkbox);
  expect($button).toHaveStyle({ backgroundColor: "gray" });
  expect($button).toBeDisabled();
  expect($checkbox).toBeChecked();

  fireEvent.click($checkbox);
  expect($button).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect($button).toBeEnabled();
  expect($checkbox).not.toBeChecked();
});

// Medium Violet Red
// Midnight Blue

describe("spaces before camel-case capital letter", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
