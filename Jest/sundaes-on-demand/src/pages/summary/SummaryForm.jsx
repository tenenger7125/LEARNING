import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const checkboxLabel = (
  <span>
    I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
  </span>
);

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(false);

  const handleCheckBoxChange = (e) => setDisabled(e.target.checked);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check type="checkbox" checked={disabled} onChange={handleCheckBoxChange} label={checkboxLabel} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!disabled}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
