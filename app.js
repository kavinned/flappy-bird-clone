const gameContainer = document.querySelector(".container");
const bird = document.querySelector(".playerModel");
const ground = document.querySelector(".ground");
const startGame = document.getElementById("start-game");
const resetGame = document.getElementById("reset-game");
const score = document.querySelector(".score");
const scorePage = document.querySelector(".scorePage");
const tube = document.querySelector(".tubeContainer");
const gap = document.querySelector(".gap");

let moveUp = -50;
let gravity = 5;
let birdInitialTop = bird.offsetTop;
let gameState = 0;

function start() {
  gameState = 1;
  birdInitialTop += gravity;
  bird.style.top = birdInitialTop + "px";
  if (birdInitialTop <= 0 || birdInitialTop >= 570) {
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
const gravityLoop = setInterval(start, 50);

function moveBird() {
  let currentTop = bird.offsetTop;
  birdInitialTop += moveUp;
  bird.style.top = currentTop + "px";
}

gameContainer.addEventListener("click", moveBird);
tube.addEventListener("animationiteration", () => {
  gap.style.top = 100 + "px";
});
