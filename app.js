const gameContainer = document.querySelector(".container");
const bird = document.querySelector(".playerModel");
const ground = document.querySelector(".ground");
const startGame = document.getElementById("start-game");
const resetGame = document.getElementById("reset-game");
const score = document.querySelector(".score");
const scorePage = document.querySelector(".scorePage");
const tube = document.querySelector(".tubeContainer");
const gap = document.querySelector(".gap");
const topTube = document.getElementById("top");
const botTube = document.getElementById("bot");

let moveUp = -50;
let gravity = 6.5;
let birdInitialTop = bird.offsetTop;
let gameState = 0;

function start() {
  startGame.style.display = "none";
  topTube.classList.add("anim");
  botTube.classList.add("anim");
  gameState = 1;
  birdInitialTop += gravity;
  bird.style.top = birdInitialTop + "px";
  if (birdInitialTop <= 0 || birdInitialTop >= 570) {
    gameContainer.removeChild(tube);
    gameState = 2;
    gravity = 0;
    birdInitialTop = bird.offsetTop;
    gameContainer.removeEventListener("click", moveBird);
  }
  if (gameState === 2) {
    // scorePage.style.display = "block";
    scorePage.style.zIndex = 1;
  }
  return gameState;
}

function moveBird() {
  let currentTop = bird.offsetTop;
  birdInitialTop += moveUp;
  bird.style.top = currentTop + "px";
}

let scoreNum = 0;
topTube.addEventListener("animationiteration", () => {
  let randomNum = Math.random() * (400 - 100) + 100;
  topTube.style.height = randomNum + "px";
  scoreNum = scoreNum + 1;
  score.innerText = `Score: ${scoreNum}`;
});

gameContainer.addEventListener("click", moveBird);

startGame.addEventListener("click", () => {
  const gravityLoop = setInterval(start, 50);
});
