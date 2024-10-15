import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const TimerApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isLabel, setIsLabel] = useState(true);
  const [initialTime] = useState(60);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const handleStart = () => {
    setStartTime(moment().format("hh:mm:ss A"));
    setIsRunning(true);
    setSecondsLeft(initialTime);
  };

  const handleStop = () => {
    setEndTime(moment().format("hh:mm:ss A"));
    setIsRunning(false);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (secondsLeft / initialTime) * circumference;

  return (
    <div className="container">
      <header>
        <img src="/companylogo.png" alt="Company Logo" />

        <div>
          <label>Gerätenummer</label>
          <select className="select_label">
            <option value="123562">123562</option>
          </select>
        </div>

        <div>
          <label>Bediener</label>
          <select className="select_label">
            <option value="John">John</option>
            <option value="Ravi">Ravi</option>
            <option value="Kanthan Kavin">Kanthan Kavin</option>
          </select>
        </div>

        <button onClick={handleStart}>START</button>
      </header>

      <div className="timer-section">
        <div className="date-picker">
          <label>Datum</label>
          <DatePicker
            className="select_label"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="timer-display">
          <div style={{ position: "relative" }}>
            
            <svg width="120" height="120" style={{ position: "absolute", left: 0 }}>
              <circle cx="60" cy="60" r={radius} stroke="#adadad" strokeWidth="5" fill="none" />
            </svg>

           
            <svg width="120" height="120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="green"
                strokeWidth="5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
          </div>

          <div className="circle-timer">
            <span>{formatTime(secondsLeft)}</span>
            {isRunning ? (
              <span onClick={() => (setIsRunning(false), setIsLabel(false))}>
                <div style={{ width: "30px", height: "30px" }}>
                  <img src={`/pause.png`} alt="Pause" style={{ width: "100%", height: "100%" }} />
                </div>
              </span>
            ) : (
              <span onClick={() => (setIsRunning(true), setIsLabel(true))}>
                <div style={{ width: "30px", height: "30px" }}>
                  <img src={`/play.png`} alt="Play" style={{ width: "100%", height: "100%" }} />
                </div>
              </span>
            )}
          </div>

          <div className="times">
            <div>
              <label>Angangszeit</label>
              <input
                className="select_label"
                type="text"
                value={startTime || "--:--"}
                readOnly
              />
            </div>
            <div>
              <label>Endzeit</label>
              <input
                className="select_label"
                type="text"
                value={endTime || "--:--"}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {isLabel && <button onClick={handleStop} className="stop-button">STOP</button>}
    </div>
  );
};

export default TimerApp;
