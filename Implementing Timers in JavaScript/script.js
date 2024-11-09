// Task 1: Countdown Timer
let timerInterval;

document.getElementById('startButton').addEventListener('click', function() {
    const duration = parseInt(document.getElementById('durationInput').value);
    startTimer(duration);
});

function startTimer(duration) {
    clearInterval(timerInterval);
    let timeRemaining = duration;
    updateTimerDisplay(timeRemaining);

    timerInterval = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showNotification('Time is up!');
            setTimeout(function() {
                showNotification('Resetting the clock...');
                setTimeout(function() {
                    document.getElementById('notification').textContent = '';
                    document.getElementById('dismissButton').style.display = 'none';
                }, 3000); // Delay before clearing the notification
            }, 2000); // Delay before showing the reset notification
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timerDisplay').textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Task 2: Delayed Notification
function showNotification(message) {
    document.getElementById('notification').textContent = message;
    document.getElementById('dismissButton').style.display = 'inline-block';
}

// Task 3: Repeat Notification
let notificationInterval;

document.getElementById('dismissButton').addEventListener('click', function() {
    clearInterval(notificationInterval);
    document.getElementById('notification').textContent = '';
    document.getElementById('dismissButton').style.display = 'none';
});

function startRepeatNotification(message, interval) {
    notificationInterval = setInterval(function() {
        showNotification(message);
    }, interval);
}
