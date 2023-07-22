import { useState } from "react";
import "./App.css";

// \B는 있어야하고, \b는 없어야한다. $1은 ()로 그룹화한 녀석을 뜻한다.
export const replaceCamelWithSpaces = (color) => color.replace(/\B([A-Z])\B/g, " $1");

function App() {
  const [backgroundColor, setBackgroundColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);

  const handleClick = () =>
    setBackgroundColor(backgroundColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed");
  const handleChange = (e) => setDisabled(e.target.checked);

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? "gray" : backgroundColor, color: "white" }}
        onClick={handleClick}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(backgroundColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed")}
      </button>
      <input type="checkbox" id="disable-button-checkbox" checked={disabled} onChange={handleChange} />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
