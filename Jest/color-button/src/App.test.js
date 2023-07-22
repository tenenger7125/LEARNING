import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

// expect 단언문은 하나만 하는게 좋다.
// 여러개를 사용하여 단언문을 확장하는 경우는 기능 테스트할 때 유용하다.

test("button has correct initial color, text and update when clicked", () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const $button = screen.getByRole("button", { name: "Change to blue" });

  // expect the background color to be red
  expect($button).toHaveStyle({ backgroundColor: "red" });

  // click button
  fireEvent.click($button);

  // expect the background color to be blue
  expect($button).toHaveStyle({ backgroundColor: "blue" });

  // expect the button text to be 'Change to red'
  expect($button).toHaveTextContent("Change to red");
});
