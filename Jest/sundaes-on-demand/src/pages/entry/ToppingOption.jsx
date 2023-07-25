import { Col, Form } from "react-bootstrap";
import { useOrderDetail } from "../../contexts/orderDetail";

const ToppingOption = ({ name, imagePath }) => {
  const { updateOrderDetail } = useOrderDetail();
  const handleChange = (e) => {
    updateOrderDetail(name, +e.target.checked, "toppings");
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`http://localhost:3030${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} data-testid={`topping-checkbox-${name}`} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
