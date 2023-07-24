import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";

import { OrderDetailContextProvider } from "./contexts/orderDetail";

function App() {
  return (
    <Container>
      <OrderDetailContextProvider>
        <OrderEntry />
      </OrderDetailContextProvider>
    </Container>
  );
}

export default App;
