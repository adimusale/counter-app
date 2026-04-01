import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(() => {
    return localStorage.getItem("count")
      ? parseInt(localStorage.getItem("count"))
      : 0;
  });

  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(false);

  // Save count
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "+") increment();
      if (e.key === "-") decrement();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const updateHistory = (action) => {
    setHistory((prev) => [...prev, action]);
  };

  const increment = () => {
    setCount(count + 1);
    updateHistory("+1");
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      updateHistory("-1");
    }
  };

  const addStep = (val = step) => {
    setCount(count + Number(val));
    updateHistory("+" + val);
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <div className={dark ? "container dark" : "container"}>
      <div className="card">

        <h1>🚀 Premium Counter</h1>

       <h2 key={count} className="count">{count}</h2>

        {/* Input */}
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          placeholder="Enter step"
        />

        {/* Buttons */}
        <div className="buttons">
          <button onClick={increment}>+1</button>
          <button onClick={decrement}>-1</button>
          <button onClick={() => addStep()}>Add</button>
        </div>

        <div className="buttons">
          <button onClick={() => addStep(5)}>+5</button>
          <button onClick={() => addStep(10)}>+10</button>
          <button onClick={() => addStep(50)}>+50</button>
        </div>

        <button className="reset" onClick={reset}>Reset</button>

        {/* Dark Mode */}
        <button className="toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* History */}
        <div className="history">
          <h3>History</h3>
          <ul>
            {history.slice(-5).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;