const BG = (cvs, ctx, sprite) => {
	const srcX = 0;
	const srcY = 0;
	const srcW = 275;
	const srcH = 226;
	const repeat = 4;

	return {
		x: srcX,
		y: cvs.height - srcH,
		w: srcW,
		h: srcH,

		draw() {
			for (let i = 0; i < repeat; i++)
				ctx.drawImage(
					sprite,
					srcX,
					srcY,
					srcW,
					srcH,
					this.x + i * this.w,
					this.y,
					this.w,
					this.h
				);
		},
	};
};

export default BG;
