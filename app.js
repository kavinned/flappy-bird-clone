//* CONSTANTS
const gameContainer = document.querySelector(".container");
const bird = document.querySelector(".playerModel");
const ground = document.querySelector(".ground");
const startButton = document.getElementById("start-game");
const resetButton = document.getElementById("reset-game");
const score = document.querySelector(".score");
const scoreNum = document.querySelector(".scoreNum");
const scorePage = document.querySelector(".scorePage");
const tube = document.querySelector(".tubeContainer");
const topTube = document.getElementById("top");
const botTube = document.getElementById("bot");
const gameOver = document.createElement("div");

//* VARIABLES
let moveUp = -50;
let gravity = 8;
let birdInitialTop = bird.offsetTop;
let gameState = 0;
let currentScore = 0;
let gravityLoop;

//* FUNCTIONS
function start() {
  gameState = 1;
  score.style.display = "block";
  scorePage.style.display = "block";
  startButton.style.display = "none";
  topTube.style.animation = "";
  botTube.style.animation = "";
  topTube.style.animationPlayState = "running";
  botTube.style.animationPlayState = "running";
  birdInitialTop += gravity;
  bird.style.top = birdInitialTop + "px";
  checkCollision();
  if (birdInitialTop <= 0 || birdInitialTop >= 570) {
    endGame();
  }
  return gameState;
}

function moveBird() {
  let currentTop = bird.offsetTop;
  birdInitialTop += moveUp;
  bird.style.top = currentTop + "px";
  const audio = new Audio("./assets/audio/wing.wav");
  audio.play();
}

function checkCollision() {
  const topTubeBounds = topTube.getBoundingClientRect();
  const botTubeBounds = botTube.getBoundingClientRect();
  const birdBounds = bird.getBoundingClientRect();
  if (
    (birdBounds.right > topTubeBounds.left &&
      birdBounds.left < topTubeBounds.right &&
      birdBounds.bottom > topTubeBounds.top &&
      birdBounds.top < topTubeBounds.bottom) ||
    (birdBounds.right > botTubeBounds.left &&
      birdBounds.left < botTubeBounds.right &&
      birdBounds.bottom > botTubeBounds.top &&
      birdBounds.top < botTubeBounds.bottom)
  ) {
    endGame();
  }
}

function endGame() {
  topTube.style.animationPlayState = "paused";
  botTube.style.animationPlayState = "paused";
  gameState = 2;
  gravity = 0;
  birdInitialTop = bird.offsetTop;
  const audio = new Audio("./assets/audio/hit.wav");
  audio.play();
  gameContainer.removeEventListener("click", moveBird);
  window.removeEventListener("keydown", spaceKey);
  showGameOver();
}

function spaceKey(event) {
  if (event.code === "Space") {
    moveBird();
    checkCollision();
  }
}

function showGameOver() {
  if (gameState === 2) {
    scorePage.style.display = "none";
    setTimeout(() => {
      gameOver.classList.add("game-over");
      gameContainer.appendChild(gameOver);
      const audio = new Audio("./assets/audio/die.wav");
      audio.play();
    }, 1000);
    setTimeout(() => {
      gameOver.remove();
      score.style.display = "block";
      scorePage.style.top = 269.125 + "px";
      scorePage.style.display = "block";
      resetButton.style.display = "block";
    }, 3000);
    clearInterval(gravityLoop);
  } else {
    return;
  }
}

function resetGame() {
  gameState = 0;
  gravity = 8;
  bird.style.top = 300 + "px";
  bird.style.left = 50 + "px";
  birdInitialTop = bird.offsetTop;
  birdInitialTop += gravity;
  bird.style.top = birdInitialTop + "px";
  currentScore = 0;
  scoreNum.innerText = `${currentScore}`;
  startButton.style.display = "block";
  scorePage.style.display = "none";
  scorePage.style.top = 10 + "px";
  resetButton.style.display = "none";
  topTube.style.animation = "none";
  botTube.style.animation = "none";
  const audio = new Audio("./assets/audio/swoosh.wav");
  audio.play();
}

//* EVENT LISTENERS
startButton.addEventListener("click", () => {
  topTube.classList.add("anim");
  botTube.classList.add("anim");
  gravityLoop = setInterval(start, 50);
  gameContainer.addEventListener("click", moveBird);
  window.addEventListener("keydown", spaceKey);
});

topTube.addEventListener("animationiteration", () => {
  let randomNum = Math.random() * (400 - 100) + 100;
  topTube.style.height = randomNum + "px";
  currentScore = currentScore + 1;
  scoreNum.innerText = `${currentScore}`;
  const audio = new Audio("./assets/audio/point.wav");
  audio.play();
});

resetButton.addEventListener("click", resetGame);
