import { useState } from "react";
import { useOrderDetail } from "../../contexts/orderDetail";
import { useEffect } from "react";
import { axios } from "axios";
import { Button } from "react-bootstrap";

const OrderConfirm = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetail();

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("http://localhost:3030/order");
        setOrderNumber(data.orderNumber);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p>your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>as per our terms and conditions, nothing will happen no</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirm;
