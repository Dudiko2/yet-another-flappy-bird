const Bird = (cvs, ctx, sprite) => {
	const srcX = 277;
	const framesY = [113, 139, 165];
	const srcW = 34;
	const srcH = 26;
	const determineAngle = (a, b) => {
		let angle = Math.atan(b / a);
		angle = b >= 0 ? angle * 4 : angle;
		angle = angle >= Math.PI / 2 ? Math.PI / 2 : angle;

		return angle;
	};

	return {
		x: 50,
		y: cvs.height / 5,
		w: srcW,
		h: srcH,
		gravity: 6,
		vY: 0,
		frame: 0,
		timeForFrame: 0.05,
		timeElapsed: 0,
		flapDir: -1,
		angle: 0,
		jump: 3.5,
		alive: true,
		onGround: false,

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
				-this.w / 2,
				-this.h / 2,
				this.w,
				this.h
			);

			ctx.rotate(-this.angle);
			ctx.translate(-centerX, -centerY);
		},

		update(secondsPassed) {
			this.timeElapsed += secondsPassed;

			this.vY += this.gravity * secondsPassed;
			this.y = this.onGround ? this.y : this.y + this.vY;

			if (!this.onGround) this.angle = determineAngle(this.w / 2, this.vY);

			if (this.angle === Math.PI / 2 || this.onGround) {
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
		},

		flap() {
			this.vY = -this.jump;
			this.frame = 2;
			this.timeElapsed = 0;
			this.flapDir = 1;
		},

		isColliding(obj) {
			return (
				this.x + this.w >= obj.x &&
				this.x <= obj.x + obj.w &&
				this.y + this.h >= obj.y &&
				this.y <= obj.y + obj.h
			);
		},

		die() {
			this.alive = false;
		},

		ground() {
			this.die();
			this.onGround = true;
		},
	};
};

export default Bird;
