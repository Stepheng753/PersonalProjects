function Circle(x, y) {
	this.x = x;
	this.y = y;
	this.r = 1;
	this.growing = true;

	this.show = function () {
		colorMode(HSB);
		stroke(frameCount % 360, 100, 100);
		strokeWeight(2);
		noFill();
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	};

	this.grow = function () {
		if (this.growing) {
			this.r = this.r + 0.5;
		}
	};

	this.edges = function () {
		return this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0;
	};
}
