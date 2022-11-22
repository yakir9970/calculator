import Button from "./Components/Button.jsx";
import "./styles.css";

function App() {
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-op">123,234 *</div>
        <div className="curr-op">123,234</div>
      </div>

      <button className="span-two light">AC</button>
      <button className="light">DEL</button>
      <button className="orange">÷</button>
      <button className="dark">7</button>
      <button className="dark">8</button>
      <button className="dark">9</button>
      <button className="orange">×</button>
      <button className="dark">4</button>
      <button className="dark">5</button>
      <button className="dark">6</button>
      <button className="orange">-</button>
      <button className="dark">1</button>
      <button className="dark">2</button>
      <button className="dark">3</button>
      <button className="orange">+</button>
      <button className="dark">0</button>
      <button className="dark">.</button>
      <button className="span-two orange">=</button>
    </div>
  );
}

export default App;
