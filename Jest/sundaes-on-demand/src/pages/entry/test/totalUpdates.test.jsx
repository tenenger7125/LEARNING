import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
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
