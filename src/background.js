const BG = (cvs, ctx, sprite) => {
	const srcX = 0;
	const srcY = 0;
	const srcW = 275;
	const srcH = 226;

	return {
		x: srcX,
		y: cvs.height - srcH,
		w: srcW,
		h: srcH,

		draw() {
			for (let i = 0; i * this.w < cvs.width; i++)
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
