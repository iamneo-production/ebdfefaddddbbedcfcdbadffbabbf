import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div>
      <p id="time" data-testid="time">
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </p>
      {isRunning ? (
        <div>
          <button id="pause" data-testid="pause" onClick={handlePause}>
            Pause
          </button>
          <button id="reset" data-testid="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      ) : (
        <button id="start" data-testid="start" onClick={handleStart}>
          Start
        </button>
      )}
      {isRunning && (
        <button id="resume" data-testid="resume" onClick={handleResume}>
          Resume
        </button>
      )}
    </div>
  );
};

export default Stopwatch;
