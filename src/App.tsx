import React, { useState } from "react";
import "./App.scss";
import Pad from "./components/Pad";
import OnOff from "./components/OnOff";

const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);

  // create hardcoded array of audio files to play
  const pads = [];
  for (let i = 1; i < 10; i++) {
    pads.push(<Pad key={i} file={i} started={started} />);
  }

  return (
    <div className="App">
      <div className="pads">{pads}</div>
      <button
        className={`startButton ${started ? "active" : ""}`}
        onClick={() => {
          setStarted(!started);
        }}
      >
        <OnOff />
      </button>
    </div>
  );
};

export default App;
