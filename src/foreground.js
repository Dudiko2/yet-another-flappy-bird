const Ground = (cvs, ctx, sprite) => {
	const srcX = 277;
	const srcY = 0;
	const srcW = 223;
	const srcH = 111;
	const repeat = 4;

	return {
		x: 0,
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
		update(secondsPassed) {
			this.x -= 60 * secondsPassed;
			this.x = this.x + this.w * repeat <= cvs.width ? 0 : this.x;
		},
	};
};

export default Ground;
