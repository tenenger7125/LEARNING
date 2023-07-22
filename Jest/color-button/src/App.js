import { useState } from "react";
import "./App.css";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("red");

  const handleClick = () => setBackgroundColor(backgroundColor === "red" ? "blue" : "red");

  return (
    <div>
      <button style={{ backgroundColor, color: "white" }} onClick={handleClick}>
        Change to {backgroundColor === "red" ? "blue" : "red"}
      </button>
    </div>
  );
}

export default App;
