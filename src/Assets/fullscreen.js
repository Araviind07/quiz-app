<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz with Timer and State Persistence</title>
    <style>
        #timer {
            font-size: 24px;
            margin: 20px;
        }
        .question {
            display: none;
        }
        .question.active {
            display: block;
        }
        .navigation {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div id="timer">10:00</div>
    <div id="quiz">
        <div class="question" id="question-0">Question 1: What is HTML?</div>
        <div class="question" id="question-1">Question 2: What is CSS?</div>
        <div class="question" id="question-2">Question 3: What is JavaScript?</div>
        <!-- Add more questions as needed -->
    </div>
    <div class="navigation">
        <button id="prev">Previous</button>
        <button id="next">Next</button>
    </div>

    <script>
        const timerElement = document.getElementById('timer');
        const TOTAL_TIME = 10 * 60; // 10 minutes in seconds
        const questions = document.querySelectorAll('.question');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        let currentQuestionIndex = 0;

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        function startTimer(duration) {
            let remainingTime = duration;
            const interval = setInterval(() => {
                if (remainingTime <= 0) {
                    clearInterval(interval);
                    alert('Time is up!');
                    // Handle time up (e.g., submit the quiz)
                    return;
                }
                remainingTime--;
                timerElement.textContent = formatTime(remainingTime);
                localStorage.setItem('remainingTime', remainingTime);
            }, 1000);
        }

        function showQuestion(index) {
            questions.forEach((question, i) => {
                question.classList.toggle('active', i === index);
            });
            localStorage.setItem('currentQuestionIndex', index);
        }

        function navigateQuestion(offset) {
            currentQuestionIndex = Math.min(Math.max(currentQuestionIndex + offset, 0), questions.length - 1);
            showQuestion(currentQuestionIndex);
        }

        window.onload = function() {
            let remainingTime = localStorage.getItem('remainingTime');
            if (remainingTime === null) {
                remainingTime = TOTAL_TIME;
                localStorage.setItem('remainingTime', remainingTime);
            } else {
                remainingTime = parseInt(remainingTime, 10);
            }
            timerElement.textContent = formatTime(remainingTime);
            startTimer(remainingTime);

            currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10) || 0;
            showQuestion(currentQuestionIndex);
        };

        prevButton.addEventListener('click', () => navigateQuestion(-1));
        nextButton.addEventListener('click', () => navigateQuestion(1));

        window.onbeforeunload = function() {
            localStorage.removeItem('remainingTime');
        };
    </script>
</body>
</html>
