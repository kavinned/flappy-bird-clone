//* CONSTANTS
const gameContainer = document.querySelector(".container");
const bird = document.querySelector(".playerModel");
const ground = document.querySelector(".ground");
const startGame = document.getElementById("start-game");
const resetGame = document.getElementById("reset-game");
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
  startGame.style.display = "none";
  topTube.classList.add("anim");
  botTube.classList.add("anim");
  birdInitialTop += gravity;
  bird.style.top = birdInitialTop + "px";
  if (birdInitialTop <= 0 || birdInitialTop >= 570) {
    if (gameContainer.contains(tube)) {
      gameContainer.removeChild(tube);
    }
    gameState = 2;
    gravity = 0;
    birdInitialTop = bird.offsetTop;
    gameContainer.removeEventListener("click", moveBird);
    window.removeEventListener("keydown", spaceKey);
    showGameOver();
  }
  return gameState;
}

function moveBird() {
  let currentTop = bird.offsetTop;
  birdInitialTop += moveUp;
  bird.style.top = currentTop + "px";
}

function spaceKey(event) {
  if (event.code === "Space") {
    moveBird();
  }
}

function showGameOver() {
  if (gameState === 2) {
    gameOver.classList.add("game-over");
    gameContainer.appendChild(gameOver);
    scorePage.style.display = "none";
    setTimeout(() => {
      gameOver.remove();
      score.style.display = "block";
      scorePage.style.top = 269.125 + "px";
      scorePage.style.display = "block";
      resetGame.style.display = "block";
    }, 3000);
    clearInterval(gravityLoop);
  }
}
//* EVENT LISTENERS
startGame.addEventListener("click", () => {
  gravityLoop = setInterval(start, 50);
  gameContainer.addEventListener("click", moveBird);
  window.addEventListener("keydown", spaceKey);
});

topTube.addEventListener("animationiteration", () => {
  let randomNum = Math.random() * (400 - 100) + 100;
  topTube.style.height = randomNum + "px";
  currentScore = currentScore + 1;
  scoreNum.innerText = `${currentScore}`;
});
