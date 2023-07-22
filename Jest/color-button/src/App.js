import { useState } from "react";
import "./App.css";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("red");
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => setBackgroundColor(backgroundColor === "red" ? "blue" : "red");
  const handleChange = (e) => setDisabled(e.target.checked);

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? "gray" : backgroundColor, color: "white" }}
        onClick={handleClick}
        disabled={disabled}
      >
        Change to {backgroundColor === "red" ? "blue" : "red"}
      </button>
      <input type="checkbox" id="disable-button-checkbox" checked={disabled} onChange={handleChange} />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
