import React, { useState, useEffect } from "react";
const Stopwatch = () => {
  // state to track the elapsed time
  const [disable, setDisable] = useState(true);
  const [visible, setVisible] = useState(true);
  const removeVisible = ()=>{
    setVisible((prev)=>!prev);
  }
  const removeDisable= ()=>{
    setDisable(false);
  }

  const [time, setTime] = useState(0);
  // state to track whether the stopwatch is running
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    removeDisable();
    removeVisible();
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setTime(0);
    removeVisible();
    setDisable(true);
    setIsRunning(false);
  };

  const formattedTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className = "watch_container">
      <h1 className="head">React Stopwatch</h1>
      {/* display the elapsed time */}
      <p data-testid="time" className="timefont">{formattedTime()}</p>
      <div className = "button_con">
      {/* start button */}
        {visible &&(
            <button data-testid="start" className="btn" onClick={handleStart}>
              Start
            </button>
        )}
        {/* pause button */}
      {isRunning && (
        <button data-testid="pause" className="btn" onClick={handlePause}>
          Pause
        </button>
      )}
      {/* resume button */}
      {!isRunning && time !== 0 && (
        <button data-testid="resume" className="btn" onClick={handleResume}>
          Resume
        </button>
      )}
      { (
        <button data-testid="reset" className="btn_res" onClick={handleReset} disabled={disable}>
            Reset
        </button>
      )}

        </div>
    </div>
  );
};

export default Stopwatch;