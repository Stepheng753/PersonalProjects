var leftRight = [false, true];

function Obstacle() {
	this.pos = createVector(width / 4, height / 2);
	this.vel = createVector();
	this.vel.set(4);

	this.update = function () {
		if (this.pos.x + rw >= width && leftRight[1]) {
			leftRight = [true, false];
		}
		if (this.pos.x < 0 && leftRight[0]) {
			leftRight = [false, true];
		}
		if (leftRight[0]) {
			this.pos.sub(this.vel);
		}
		if (leftRight[1]) {
			this.pos.add(this.vel);
		}
	};

	this.draw = function () {
		colorMode(HSB);

		push();
		let color = map(obstacleCount, 0, popsize, 0, 360);
		fill(color, 100, 100);
		rect(this.pos.x, this.pos.y, rw, rh);
		pop();
	};

	this.changeVel = function (speed) {
		this.vel.set(speed);
	};
}
