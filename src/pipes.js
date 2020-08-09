const Pipes = (cvs, ctx, sprite, groundH) => {
	const upperSrcX = 554;
	const lowerSrcX = 501;
	const srcY = 0;
	const srcW = 52;
	const srcH = 400;

	return {
		x: cvs.width,
		y: -groundH - (Math.random() * srcH) / 2,
		w: srcW,
		h: srcH,
		gap: 136,

		draw() {
			ctx.drawImage(
				sprite,
				upperSrcX,
				srcY,
				srcW,
				srcH,
				this.x,
				this.y,
				this.w,
				this.h
			);
			ctx.drawImage(
				sprite,
				lowerSrcX,
				srcY,
				srcW,
				srcH,
				this.x,
				this.y + this.h + this.gap,
				this.w,
				this.h
			);
		},

		update(secondsPassed, pixPerSec) {
			this.x -= pixPerSec * secondsPassed;
		},
	};
};

export default Pipes;
