const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

const startSound = new Audio("start.mp3");
const warningSound = new Audio("warning.mp3");
const endSound = new Audio("end.mp3");

let totalSeconds = 150; // 2:30
let timerRunning = false;
let interval;

function updateDisplay() {

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {

    if (timerRunning) return;

    timerRunning = true;

    startSound.play();

    startBtn.style.display = "none";

    interval = setInterval(() => {

        totalSeconds--;

        updateDisplay();

        // Play warning sound at 0:30
        if (totalSeconds === 30) {
            warningSound.play();
        }

        // End timer
        if (totalSeconds <= 0) {

            clearInterval(interval);

            endSound.play();

            // Flash red
            document.body.classList.add("redFlash");

            setTimeout(() => {

                document.body.classList.remove("redFlash");

                document.body.classList.add("yellowEnd");

            }, 1000);
        }

    }, 1000);
}

startBtn.addEventListener("click", startTimer);

updateDisplay();
