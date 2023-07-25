import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

const SummaryForm = ({ setOrderPhase }) => {
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setOrderPhase("completed");
  };

  const handleCheckBoxChange = (e) => setDisabled(e.target.checked);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
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
