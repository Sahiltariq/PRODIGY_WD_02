let startTime;
let updatedTime;
let difference;
let timerID;
let running = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerID = setInterval(updateDisplay, 10);
    startStopButton.textContent = "Stop";
  } else {
    clearInterval(timerID);
    difference = new Date().getTime() - startTime;
    startStopButton.textContent = "Start";
  }
  running = !running;
}

function reset() {
  clearInterval(timerID);
  running = false;
  startTime = null;
  updatedTime = null;
  difference = null;
  display.textContent = "00:00:00";
  startStopButton.textContent = "Start";
  lapCounter = 0;
  lapsContainer.innerHTML = "";
}

function updateDisplay() {
  updatedTime = new Date().getTime() - startTime;
  const formattedTime = formatTime(updatedTime);
  display.textContent = formattedTime;
}

function formatTime(time) {
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function lap() {
  if (running) {
    lapCounter++;
    const lapTime = formatTime(updatedTime);
    const lapElement = document.createElement("div");
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
  }
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
