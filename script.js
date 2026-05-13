const timer = document.getElementById("timer");

const startSound = new Audio("start.mp4");
const warningSound = new Audio("warning.mp4");
const endSound = new Audio("end.mp4");

let totalSeconds = 150;
let running = false;
let interval;

function updateTimer() {

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    seconds = seconds.toString().padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}`;
}

function startTimer() {

    if (running) return;

    running = true;

    startSound.play();

    document.documentElement.requestFullscreen();

    interval = setInterval(() => {

        totalSeconds--;

        updateTimer();

        // Warning sound at 0:30
        if (totalSeconds === 30) {
            warningSound.play();
        }

        // End timer
        if (totalSeconds <= 0) {

            clearInterval(interval);

            endSound.play();

            // Red flash
            document.body.style.backgroundColor = "red";

            setTimeout(() => {
                document.body.style.backgroundColor = "yellow";
            }, 500);
        }

    }, 1000);
}

// Start when clicking the timer
timer.addEventListener("click", startTimer);

updateTimer();
