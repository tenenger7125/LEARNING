import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

// only를 붙이면 해당 파일에서 only를 붙인 test만 실행된다. (skip 된다.)
// 반대로 skip을 붙이면 해당 파일에서 test를 스킵한다.
test.only("handles error for scoops and toppings routes", async () => {
  // 테스트를 위한 서버 핸들러 오버라이딩.(에러 처리를 위함!)
  server.resetHandlers([
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      res(ctx.status(500));
    }),
  ]);

  render(<OrderEntry />);

  // 2번의 네트요청이 완료될 때 까지 대기해야하기 위해 waitFor 함수를 사용한다.
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});
