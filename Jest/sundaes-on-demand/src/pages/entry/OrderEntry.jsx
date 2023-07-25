import { useOrderDetail } from "../../contexts/orderDetail";
import { formatCurrency } from "../../utils";
import Options from "./Options";
import { Button } from "react-bootstrap";

const OrderEntry = ({ setOrderPhase }) => {
  const { total } = useOrderDetail();

  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total : {formatCurrency(total.scoops + total.toppings)}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
};

export default OrderEntry;
