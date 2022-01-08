'use strict';
let secretNumber = Math.floor(Math.random() * 20) + 1;
const check = document.querySelector('.check');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const number = document.querySelector('.number');
const again = document.querySelector('.again');
const highscore = document.querySelector('.highscore');
const gameOver = document.querySelector('.game-over');
const modal = document.querySelector('.modal');
const tryAgain = document.querySelector('.try');
const cancel = document.querySelector('.cancel');
let setHighscore = localStorage.getItem('highscore');
let setScore = 20;
highscore.textContent = setHighscore;

const displayMessage = function (msg) {
  message.textContent = msg;
};

const clearAll = function () {
  setScore = 20;
  score.textContent = setScore;
  document.querySelector('body').style.backgroundColor = '#222';
  number.textContent = '?';
  secretNumber = Math.floor(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  number.style.width = '15rem';
  document.querySelector('.guess').value = '';
  gameOver.classList.remove('open');
  modal.style.display = 'none';
};

const wrongNumberHandler = function (guessedNumber) {
  displayMessage(guessedNumber > secretNumber ? 'Too high!' : 'Too low!');
  setScore--;
  score.textContent = setScore;
  if (setScore === 10) {
    displayMessage('Game Over');
    modal.style.display = 'block';
    gameOver.classList.add('open');
    tryAgain.addEventListener('click', function () {
      clearAll();
    });
    cancel.addEventListener('click', function () {
      clearAll();
    });
  }
};

check.addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);
  //when there is no input
  if (!guess) {
    displayMessage('No number !');
  }
  // when player wins
  else if (guess === secretNumber) {
    number.textContent = secretNumber;
    displayMessage('Congratulations');
    document.querySelector('body').style.backgroundColor = '#60B347';
    number.style.width = '30rem';
    if (setScore > setHighscore) {
      setHighscore = setScore;
      localStorage.setItem('highscore', setHighscore);
      highscore.textContent = localStorage.getItem('highscore');
    }
  }
  //when number is wrong
  else if (guess !== secretNumber) {
    wrongNumberHandler(guess);
  }
  // when number is smaller
  //   else if (guess < secretNumber) {
  //     message.textContent = 'Too low!';
  //     setScore -= 1;
  //     score.textContent = setScore;
  //     if (setScore === 0) {
  //       message.textContent = 'Game over';
  //     }
  //   }
  //   // when number is greater
  //   else if (guess > secretNumber) {
  //     message.textContent = 'Too high!';
  //     setScore -= 1;
  //     score.textContent = setScore;
  //     if (setScore === 0) {
  //       message.textContent = 'Game over';
  //     }
  //   }
});

again.addEventListener('click', function () {
  clearAll();
});
