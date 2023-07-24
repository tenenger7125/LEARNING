import { render } from "@testing-library/react";
import { OrderDetailContextProvider } from "../contexts/orderDetail";

const renderWithContext = (component, options) => {
  return render(component, { wrapper: OrderDetailContextProvider, ...options });
};

export * from "@testing-library/react";
export { renderWithContext as render };
