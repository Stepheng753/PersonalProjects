function Circle(x, y, colr) {
	this.x = x;
	this.y = y;
	this.r = 1;
	this.growing = true;
	this.colr = colr;

	this.show = function () {
        noStroke();
		fill(this.colr);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	};

	this.grow = function () {
		if (this.growing) {
			this.r = this.r + 2;
		}
	};

	this.edges = function () {
		return this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0;
	};
}
