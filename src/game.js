import img from "./assets/sprite.png";
import Ground from "./foreground";
import BG from "./background";
import Bird from "./bird";
import Pipes from "./pipes";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const sprite = document.createElement("img");
sprite.src = img;

canvas.width = 320;
canvas.height = 640;

const SPEED = 120;

const ground = Ground(canvas, ctx, sprite);
const bg = BG(canvas, ctx, sprite);
const bird = Bird(canvas, ctx, sprite);
const createPipes = () => Pipes(canvas, ctx, sprite, ground.h);
let totalPipes = [createPipes()];

console.log(ground, bg, bird, totalPipes);

const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

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
		ground.update(secs, SPEED);
		totalPipes.forEach((p) => p.update(secs, SPEED));
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

const objectControl = () => {
	if (totalPipes[totalPipes.length - 1].x <= canvas.width / 2 && bird.alive) {
		totalPipes.push(createPipes());
	}

	totalPipes = totalPipes.filter((p) => p.x + p.w > 0);
};

addEventListener("click", () => {
	bird.flap();
});

export { clearCanvas, detectCollisions, update, draw, objectControl };
