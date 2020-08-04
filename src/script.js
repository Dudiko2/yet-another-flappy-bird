import "./style.css";
import img from "./assets/sprite.png";
import Ground from "./foreground";
import BG from "./background";
import Bird from "./bird";

// GLOBALS
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const sprite = document.createElement("img");
sprite.src = img;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let prevTime = 0;

// ENTITIES
const ground = Ground(canvas, ctx, sprite);
const bg = BG(canvas, ctx, sprite);
const bird = Bird(canvas, ctx, sprite);

const detectCollisions = () => {
	if (bird.y + bird.h >= ground.y && bird.y <= ground.y + ground.h)
		bird.ground();
};

const update = (secs) => {
	if (bird.alive) ground.update(secs);
	bird.update(secs);
};

const draw = () => {
	ctx.fillStyle = "#2960E1";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	bg.draw();
	ground.draw();
	bird.draw();
};

const gameLoop = (timestamp) => {
	const secondsPassed = (timestamp - prevTime) / 1000 || 0;
	prevTime = timestamp;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	detectCollisions();
	update(secondsPassed);
	draw();

	requestAnimationFrame(gameLoop);
};

addEventListener("click", () => {
	bird.flap();
});

gameLoop();
