const Ground = (cvs, ctx, sprite) => {
	const srcX = 277;
	const srcY = 0;
	const srcW = 222;
	const srcH = 111;

	return {
		x: 0,
		y: cvs.height - srcH,
		w: srcW,
		h: srcH,

		draw() {
			for (let i = 0; i * this.w < cvs.width * 1.5; i++)
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
		update(secondsPassed) {
			this.x -= 60 * secondsPassed;
			this.x = this.x + cvs.width * 1.5 <= cvs.width ? 0 : this.x;
		},
	};
};

export default Ground;
