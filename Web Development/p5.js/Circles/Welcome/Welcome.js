let circles = [];
let img;
let img1;
let spots = [];
let keepColor = false;

function preload() {
	img = loadImage('Welcome1.png');
	img1 = loadImage('Sky.jpg');
}
function setup() {
	createCanvas(img.width, img.height);
	frameRate(60);
	img.loadPixels();
	for (let colNum = 0; colNum < img.width; colNum++) {
		for (let rowNum = 0; rowNum < img.height; rowNum++) {
			let index = colNum + rowNum * img.width;
			let colr = img.pixels[index * 4];
			let bright = brightness([colr]);
			if (bright > 1) {
				spots.push(createVector(colNum, rowNum));
			}
		}
	}
}

function draw() {
	background(img1);

	let total = 10;
	let count = 0;
	let attempts = 0;
	if (!keepColor) {
		while (count < total) {
			let newC = newCircle();
			if (newC != null) {
				circles.push(newC);
				count++;
			}
			attempts++;
			if (attempts > 1000) {
				console.log('Done // FrameCount: ', frameCount);
				keepColor = true;
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
	} else {
		for (let i = 0; i < circles.length; i++) {
			circles[i].show();
		}
	}
}

function newCircle() {
	let r = floor(random(0, spots.length));
	let spot = spots[r];
	let x = spot.x;
	let y = spot.y;

	let valid = true;
	for (let i = 0; i < circles.length; i++) {
		let d = dist(x, y, circles[i].x, circles[i].y);
		if (d - 2 < circles[i].r) {
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
