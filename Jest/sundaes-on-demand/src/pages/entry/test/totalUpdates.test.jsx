import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";
import OrderEntry from "./../OrderEntry";

test.only("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  // 부분 매칭하려면 exact: false를 옵션으로 주어야한다.
  const $scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect($scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1, and check subtotal
  // input 값을 비우고(clear), input에 값을 1 넣는다.(type)
  const $vanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
  await user.clear($vanillaInput);
  await user.type($vanillaInput, "1");
  expect($scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const $chocolateInput = await screen.findByRole("spinbutton", { name: /chocolate/i });
  await user.clear($chocolateInput);
  await user.type($chocolateInput, "2");
  expect($scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const $toppingTotal = screen.getByText("Toppings total: $", { exact: false });
  expect($toppingTotal).toHaveTextContent("0.00");

  const $cherryCheckbox = await screen.findByTestId(`topping-checkbox-Cherries`);
  const $hotFudgeCheckbox = await screen.findByTestId(`topping-checkbox-Hot fudge`);

  await user.click($cherryCheckbox);
  expect($toppingTotal).toHaveTextContent("1.50");

  await user.click($hotFudgeCheckbox);
  expect($toppingTotal).toHaveTextContent("3.00");

  await user.click($hotFudgeCheckbox);
  expect($toppingTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /Grand total : \$/ });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /Grand total : \$/ });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /Grand total : \$/ });
    const $cherryCheckbox = await screen.findByTestId(`topping-checkbox-Cherries`);
    await user.click($cherryCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /Grand total : \$/ });
    const $cherryCheckbox = await screen.findByTestId(`topping-checkbox-Cherries`);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.click($cherryCheckbox);

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });
});
