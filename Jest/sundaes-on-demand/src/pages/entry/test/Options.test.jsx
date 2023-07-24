import { render, screen } from "@testing-library/react";
import Options from "./../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // 서버 요청은 거의 모두 비동기 동작하므로, await findBy를 사용해야한다.
  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoops$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoops", "Vanilla scoops"]);
});

test("서버에 topping get 요청시 image가 잘 나오나요?", async () => {
  render(<Options optionType="toppings" />);

  // msw가 가로채어 응답해준 배열 개수 확인
  const $toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect($toppingImages).toHaveLength(3);

  // msw가 응답해준 배열의 alt 문자열 확인
  const altTexts = $toppingImages.map((element) => element.alt);
  expect(altTexts).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});
