import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import {
  bambooFrame,
  goldFrame,
  goldStefani,
  greenLeavesFrame,
  metalFrame,
  rustyFrame,
} from "../src/assets/imgs/index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ backgroundColor: "red", height: 500 }}>
        <img src={bambooFrame} alt="asdas" height={250} />
        <img src={goldFrame} alt="asdas" height={250} />
        <img src={goldStefani} alt="asdas" height={250} />
      </div>
      <div style={{ height: 50 }} />
      <div style={{ backgroundColor: "lightblue", height: 500 }}>
        <img src={greenLeavesFrame} alt="asdas" height={250} />
        <img src={metalFrame} alt="asdas" height={250} />
        <img src={rustyFrame} alt="asdas" height={150} />
      </div>
    </>
  );
}

export default App;
