import "./style.css";
import img from "./assets/sprite.png";
import Ground from "./foreground";
import BG from "./background";
import Bird from "./bird";
import Pipes from "./pipes";

// GLOBALS
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const sprite = document.createElement("img");
sprite.src = img;

canvas.width = 320;
canvas.height = 640;

let prevTime = 0;
let lastPipeCreated = 0;
const speed = 60;

// ENTITIES
const ground = Ground(canvas, ctx, sprite);
const bg = BG(canvas, ctx, sprite);
const bird = Bird(canvas, ctx, sprite);
const newPipes = () => Pipes(canvas, ctx, sprite, ground.h);
let totalPipes = [newPipes()];

const detectCollisions = () => {
	if (bird.y + bird.h >= ground.y && bird.y <= ground.y + ground.h)
		bird.ground();

	totalPipes.forEach((p) => {
		if (bird.isColliding(p) || bird.isColliding({ ...p, y: p.y + p.h + p.gap }))
			bird.die();
	});
};

const update = (secs) => {
	if (bird.alive) {
		ground.update(secs, speed);
		totalPipes.forEach((p) => p.update(secs, speed));
	}
	bird.update(secs);
};

const draw = () => {
	ctx.fillStyle = "#2960E1";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	bg.draw();
	totalPipes.forEach((p) => p.draw());
	ground.draw();
	bird.draw();
};

const gameLoop = (timestamp) => {
	const secondsPassed = (timestamp - prevTime) / 1000 || 0;
	prevTime = timestamp;

	if (timestamp - lastPipeCreated >= 3000 && bird.alive) {
		totalPipes.push(newPipes());
		lastPipeCreated = timestamp;
	}

	totalPipes = totalPipes.filter((p) => p.x + p.w > 0);

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
