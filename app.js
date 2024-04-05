const gameContainer = document.querySelector(".container");
const bird = document.querySelector(".playerModel");
const ground = document.querySelector(".ground");
const score = document.querySelector(".score");
const scoreNum = document.querySelector(".scoreNum");
const scorePage = document.querySelector(".scorePage");
const tube = document.querySelector(".tubeContainer");
const containerBg = document.querySelector(".containerbg");
const startButton = document.getElementById("start-game");
const resetButton = document.getElementById("reset-game");
const topTube = document.getElementById("top");
const botTube = document.getElementById("bot");
const gameOver = document.createElement("div");
const winScreen = document.createElement("div");
const medal = document.createElement("img");

let moveUp = -60;
let gravity = 8;
let birdInitialTop = bird.offsetTop;
let gameState = 0;
let currentScore = 0;
let gravityLoop;
let scoreUpdated = false;

function setupGame() {
	gameState = 1;
	tube.style.display = "flex";
	score.style.display = "block";
	scorePage.style.display = "block";
	startButton.style.display = "none";
	topTube.style.animation = "";
	botTube.style.animation = "";
	animationState("running");
	topTube.classList.add("anim");
	botTube.classList.add("anim");
	gravityLoop = setInterval(startGame, 50);
	gameContainer.addEventListener("click", moveBird);
	window.addEventListener("keydown", spaceKey);
}

function playAudio(path) {
	const audio = new Audio(path);
	audio.volume = 0.2;
	audio.play();
}

function animationState(state) {
	topTube.style.animationPlayState = state;
	botTube.style.animationPlayState = state;
	ground.style.animationPlayState = state;
	containerBg.style.animationPlayState = state;
}

function startGame() {
	birdInitialTop += gravity;
	bird.style.top = birdInitialTop + "px";
	checkCollision();
	updateScore();
	winGame();
	return gameState;
}

function heightChanger() {
	scoreUpdated = false;
	let randomNum = Math.random() * (400 - 100) + 100;
	topTube.style.height = randomNum + "px";
}

function moveBird() {
	let currentTop = bird.offsetTop;
	birdInitialTop += moveUp;
	bird.style.top = currentTop + "px";
	playAudio("./assets/audio/wing.wav");
}

function updateScore() {
	const topTubeBounds = topTube.getBoundingClientRect();
	const birdBounds = bird.getBoundingClientRect();
	if (scoreUpdated === false && birdBounds.right > topTubeBounds.right) {
		currentScore += 1;
		scoreNum.innerText = `${currentScore}`;
		scoreUpdated = true;
		playAudio("./assets/audio/point.wav");
	}
}

function checkCollision() {
	const topTubeBounds = topTube.getBoundingClientRect();
	const botTubeBounds = botTube.getBoundingClientRect();
	const birdBounds = bird.getBoundingClientRect();
	if (
		(birdBounds.right > topTubeBounds.left &&
			birdBounds.left < topTubeBounds.right &&
			birdBounds.top < topTubeBounds.bottom) ||
		(birdBounds.right > botTubeBounds.left &&
			birdBounds.left < botTubeBounds.right &&
			birdBounds.bottom > botTubeBounds.top) ||
		birdInitialTop <= 0 ||
		birdInitialTop >= 570
	) {
		loseGame();
	}
}

function stopGame() {
	animationState("paused");
	gameState = 2;
	gravity = 0;
	birdInitialTop = bird.offsetTop;
	gameContainer.removeEventListener("click", moveBird);
	window.removeEventListener("keydown", spaceKey);
}

function loseGame() {
	stopGame();
	playAudio("./assets/audio/hit.wav");
	showGameOver();
	showResetScreen();
}

function winGame() {
	let hasWon = false;
	if (currentScore === 1 && hasWon === false) {
		stopGame();
		playAudio("./assets/audio/win.wav");
		showWinScreen();
		showResetScreen();
		hasWon = true;
		scoreUpdated = false;
	}
}

function showGameOver() {
	scorePage.style.display = "none";
	setTimeout(() => {
		gameOver.classList.add("game-over");
		gameContainer.insertBefore(gameOver, scorePage);
		playAudio("./assets/audio/die.wav");
	}, 1000);
	setTimeout(() => {
		gameOver.remove();
	}, 3000);
	clearInterval(gravityLoop);
}

function showWinScreen() {
	medal.setAttribute("src", "./assets/sprites/medal.png");
	scorePage.style.display = "none";
	setTimeout(() => {
		winScreen.classList.add("win-screen");
		winScreen.innerText = "You Win!";
		gameContainer.insertBefore(winScreen, scorePage);
		winScreen.appendChild(medal);
	}, 1000);
	setTimeout(() => {
		winScreen.remove();
	}, 3000);
	clearInterval(gravityLoop);
}

function showResetScreen() {
	setTimeout(() => {
		score.style.display = "block";
		scorePage.style.top = 269.125 + "px";
		scorePage.style.display = "block";
		resetButton.style.display = "block";
	}, 3000);
}

function resetPosition() {
	bird.style.top = 300 + "px";
	bird.style.left = 50 + "px";
	birdInitialTop = bird.offsetTop;
	birdInitialTop += gravity;
	bird.style.top = birdInitialTop + "px";
}

function resetState() {
	gameState = 0;
	gravity = 8;
	currentScore = 0;
	scoreNum.innerText = `${currentScore}`;
	startButton.style.display = "block";
	scorePage.style.display = "none";
	scorePage.style.top = 10 + "px";
	resetButton.style.display = "none";
	topTube.style.animation = "none";
	botTube.style.animation = "none";
	playAudio("./assets/audio/swoosh.wav");
}

function resetGame() {
	resetState();
	resetPosition();
}

function spaceKey(event) {
	if (event.code === "Space") {
		moveBird();
	}
}

startButton.addEventListener("click", setupGame);

topTube.addEventListener("animationiteration", heightChanger);

resetButton.addEventListener("click", resetGame);
