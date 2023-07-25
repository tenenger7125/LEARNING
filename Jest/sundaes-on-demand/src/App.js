import { useState } from "react";
import { Container } from "react-bootstrap";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderConfirm from "./pages/confirmation/OrderConfirm";
import OrderSummary from "./pages/summary/OrderSummary";

import { OrderDetailContextProvider } from "./contexts/orderDetail";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirm;
      break;
    default:
      break;
  }

  return (
    <OrderDetailContextProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailContextProvider>
  );
}

export default App;
