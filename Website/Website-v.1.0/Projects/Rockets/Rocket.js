function Rocket(dna) {
	this.pos = createVector(width / 2, height);
	this.vel = createVector();
	this.acc = createVector();

	this.completed = false;
	this.crashed = false;

	this.dna = dna ? dna : new DNA();
	this.fitness = 0;

	this.applyForce = function (force) {
		this.acc.add(force);
	};

	this.calcFitness = function () {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);

		// The closer the Rocket is to the target, the bigger the fitness
		this.fitness = map(d, 0, maxDistance, maxDistance, 0);

		// If threshold is met, multiply the fitness by a specific factor
		if (count < speedThres && this.completed) {
			let fitFactor = map(count, 0, speedThres, speedFactor, 1);
			this.fitness *= fitFactor;
		}
		// Incentive
		if (this.completed) {
			this.fitness *= completionFactor;
		}
		// Deterrent
		if (this.crashed) {
			this.fitness /= crashFactor;
		}
	};

	this.update = function () {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);

		// Target
		if (d <= targetradius) {
			this.completed = true;
			this.pos = target.copy();
			targetCount++;
		}

		// Crash
		if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
			this.crashed = true;
			obstacleCount++;
		}
		if (this.pos.x > width || this.pos.x < 0) {
			this.crashed = true;
		}
		if (this.pos.y > height || this.pos.y < 0) {
			this.crashed = true;
		}

		// Neither
		this.applyForce(this.dna.genes[count]);

		if (!this.completed && !this.crashed) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(4);
		}
	};

	this.show = function () {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);

		push();

		colorMode(HSB);
		noStroke();
		let color = map(d, 0, maxDistance, 0, 360);
		fill(color, 100, 100, 150);

		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());

		rectMode(CENTER);
		rect(0, 0, 25, 5);
		triangle(12.5, -2.5, 12.5, 2.5, 25, 0);

		pop();
	};
}
