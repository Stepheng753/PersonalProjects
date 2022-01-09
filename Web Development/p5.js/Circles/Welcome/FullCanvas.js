let circles = [];

function setup() {
	createCanvas(1000, 400);
}

function draw() {
	background(0);

	let total = 5;
	let count = 0;
	let attempts = 0;

	while (count < total) {
		let newC = newCircle();
		if (newC != null) {
			circles.push(newC);
			count++;
		}
		attempts++;
		if (attempts > 100) {
			noLoop();
			alert('Finished');
			break;
		}
	}
	for (let i = 0; i < circles.length; i++) {
		if (circles[i].growing) {
			if (circles[i].edges()) {
				circles[i].growing = false;
			} else {
				for (let j = 0; j < circles.length; j++) {
					if (circles[i] != circles[j]) {
						let d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
						if (d - 2 < circles[i].r + circles[j].r) {
							circles[i].growing = false;
							break;
						}
					}
				}
			}
		}
		circles[i].show();
		circles[i].grow();
	}
}

function newCircle() {
	x = random(width);
	y = random(height);

	let valid = true;
	for (let i = 0; i < circles.length; i++) {
		let d = dist(x, y, circles[i].x, circles[i].y);
		if (d < circles[i].r) {
			valid = false;
			break;
		}
	}

	if (valid) {
		return new Circle(x, y);
	} else {
		return null;
	}
}
