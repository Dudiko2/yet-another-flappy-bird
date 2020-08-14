import "./style.css";
import {
	clearCanvas,
	detectCollisions,
	update,
	draw,
	objectControl,
} from "./game";

let prevTime = 0;

const gameLoop = (timestamp) => {
	const secondsPassed = (timestamp - prevTime) / 1000 || 0;
	prevTime = timestamp;

	objectControl();

	clearCanvas();

	detectCollisions();
	update(secondsPassed);
	draw();

	requestAnimationFrame(gameLoop);
};

gameLoop();
