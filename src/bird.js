const Bird = (cvs, ctx, sprite) => {
	const srcX = 277;
	const framesY = [113, 139, 165];
	const srcW = 34;
	const srcH = 26;

	return {
		x: 50,
		y: cvs.height / 2 - srcH,
		w: srcW,
		h: srcH,
		gravity: 8,
		vY: 0,
		frame: 0,
		timeForFrame: 0.05,
		timeElapsed: 0,
		flapDir: -1,
		angle: 0,

		get center() {
			return [this.x + this.w / 2, this.y + this.h / 2];
		},

		draw() {
			const [centerX, centerY] = this.center;
			ctx.translate(centerX, centerY);
			ctx.rotate(this.angle);

			ctx.drawImage(
				sprite,
				srcX,
				framesY[this.frame],
				srcW,
				srcH,
				0,
				0,
				this.w,
				this.h
			);

			ctx.rotate(-this.angle);
			ctx.translate(-centerX, -centerY);
		},
		update(secondsPassed) {
			this.timeElapsed += secondsPassed;

			const [a, b] = [this.w / 2, this.vY];
			this.angle = Math.atan(b / a);
			this.angle = this.vY >= 0 ? this.angle * 4 : this.angle;
			this.angle = this.angle >= Math.PI / 2 ? Math.PI / 2 : this.angle;

			if (this.angle === Math.PI / 2) {
				this.frame = 1;
				this.flapDir = 1;
				this.timeElapsed = 0;
			} else if (this.timeElapsed >= this.timeForFrame) {
				this.flapDir =
					this.frame === 0 || this.frame + 1 === framesY.length
						? this.flapDir * -1
						: this.flapDir;
				this.frame += this.flapDir;
				this.timeElapsed = 0;
			}
			this.vY += this.gravity * secondsPassed;
			this.y += this.vY * 1.2;
		},
		flap() {
			this.vY = -5;
			this.frame = 2;
			this.timeElapsed = 0;
			this.flapDir = 1;
		},
	};
};

export default Bird;
