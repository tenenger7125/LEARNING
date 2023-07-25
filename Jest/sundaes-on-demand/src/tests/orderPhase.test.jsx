import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();

  // render app
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const $vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  const $chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  const $cherriesCheckbox = screen.getByRole("checkbox", { name: "Cherries" });

  await user.clear($vanillaInput);
  await user.type($vanillaInput, "2");

  await user.clear($chocolateInput);
  await user.type($chocolateInput, "1");

  await user.click($cherriesCheckbox);

  // find and click order summary button
  const $orderSummaryButton = screen.getBtRole("button", { name: /order sundae/i });
  await user.click($orderSummaryButton);

  // check summary subtotals
  const $summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  const $scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  const $toppingHeading = screen.getByRole("heading", { name: "Toppings: $1.50" });

  expect($summaryHeading).toBeInTheDocument();
  expect($scoopsHeading).toBeInTheDocument();
  expect($toppingHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("1 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const $termText = screen.getByRole("checkbox", { name: /terms and conditions/i });
  await user.click($termText);

  // confirm order number on confirmation page
  const $confirmOrderButton = screen.getByRole("button", { name: /confirm order/i });
  await user.click($confirmOrderButton);

  // expect loading to show
  const $loading = screen.getByText(/loading/i);
  expect($loading).toBeInTheDocument();

  const $orderNumber = await screen.findByText(/order number/i);
  expect($orderNumber).toBeInTheDocument();
  // click new order button on confirmation page
  const $newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click($newOrderButton);

  // check that scoops and toppings subtotals has been reset
  const $scoopsTotal = await screen.findByText(/scoops total: \$0.00/i);
  const $toppingsTotal = await screen.findByText(/toppings total: \$0.00/i);
  expect($scoopsTotal).toBeInTheDocument();
  expect($toppingsTotal).toBeInTheDocument();

  unmount();
});
