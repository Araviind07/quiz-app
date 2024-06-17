import React, { useState } from 'react'
import { data } from '../../Assets/data.js';
import "./Quiz.css"

const Quiz = () => {


  function isFullscreen() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
}

function requestFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function showFullscreenPopup() {
    const popup = document.getElementById('fullscreen-popup');
    popup.style.display = 'block';
}

function hideFullscreenPopup() {
    const popup = document.getElementById('fullscreen-popup');
    popup.style.display = 'none';
}

document.getElementById('enter-fullscreen').addEventListener('click', function() {
    requestFullscreen();
    hideFullscreenPopup();
});

// Check if the page is not in fullscreen mode initially
if (!isFullscreen()) {
    showFullscreenPopup();
}

// Listen for fullscreen change events
document.addEventListener('fullscreenchange', function() {
    if (isFullscreen()) {
        hideFullscreenPopup();
    } else {
        showFullscreenPopup();
    }
});

document.addEventListener('webkitfullscreenchange', function() {
    if (isFullscreen()) {
        hideFullscreenPopup();
    } else {
        showFullscreenPopup();
    }
});

document.addEventListener('mozfullscreenchange', function() {
    if (isFullscreen()) {
        hideFullscreenPopup();
    } else {
        showFullscreenPopup();
    }
});

document.addEventListener('MSFullscreenChange', function() {
    if (isFullscreen()) {
        hideFullscreenPopup();
    } else {
        showFullscreenPopup();
    }
});



}
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







   let [index,setIndex] = useState(0);
   let [question,setQuestion] = useState(data[index]);
   let [lock,setLock] = useState(false);
   let [score,setScore] = usestate(0);
   let [result,setResult] = useState(false)

   let Option1 = useRef(null);
   let Option2 = useRef(null);
   let Option3 = useRef(null);
   let Option4 = useRef(null);

   let option_array = [Option1,Option2,Option3,Option4]

   const checkAns = (e,ans) => {
    if(lock === false){
      if(question.ans===ans){
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev=>prev+1)
      }
      else{
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct");
      }
    }

    const next = () =>{
      if (lock===true){
        if (index === data.length-1){
          setResult(true);
          return 0;
        }
        setIndex(++index);
        setQuestion(data[index])
        setLock(false)
        option_array.map((option) => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
      };
    };

    const reset =() => {
      setIndex(0);
      setQuestion(data[0]);
      setScore(0);
      setLock(false);
      setResult(false);
    }
      
   };
return (
    <div className='container'>
       <h1>Quiz App</h1>
       <hr />
       {result?<>
        <h2>You scored {score} out of {data.length}</h2>
       <button onClick={reset}>Reset</button>
       </>:
       <> 
       <h2>{index+1}. {question.question}</h2>
       <div id="timer">10:00</div>
       <ul>
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
       </ul>
       <button onClick={next}>Next</button>
       <div className='index'>Question {index+1} of {data.length}</div>
       </>}
       
      
    </div>
  )


export default Quiz
