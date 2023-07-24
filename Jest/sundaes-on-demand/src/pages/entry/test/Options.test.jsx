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
