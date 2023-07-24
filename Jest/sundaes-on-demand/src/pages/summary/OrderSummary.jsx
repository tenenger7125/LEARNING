import SummaryForm from "./SummaryForm";
import { useOrderDetail } from "../../contexts/orderDetail";
import { formatCurrency } from "../../utils";

const OrderSummary = () => {
  const { total, orderDetail } = useOrderDetail();

  const scoopArray = Object.entries(orderDetail.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Object.keys(orderDetail.toppings);
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(total["scoops"])}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(total["toppings"])}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  );
};

export default OrderSummary;
