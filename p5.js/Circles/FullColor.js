let circles = [];
let img;
let keepColor = false;
let canvasWidth = Math.min(window.innerWidth * 0.95, (window.innerHeight * 0.95) / 2);
let ogImg = document.getElementById('og-img');
ogImg.style.maxWidth = window.innerWidth * 0.95 + 'px';
ogImg.style.maxHeight = (window.innerHeight * 0.95) / 2 + 'px';

function preload() {
	img = loadImage('TreCimeNaturalPark.jpg');
}
function setup() {
	img.resize(ogImg.width, ogImg.height);
	let canvas = createCanvas(img.width, img.height);
	canvas.parent('sketch');
	frameRate(60);
	pixelDensity(1);
	img.loadPixels();
}

function draw() {
	background(0);

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
				'Done // FrameCount: ', frameCount;
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
							if (d - 1 < circles[i].r + circles[j].r) {
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

	if (frameCount > 600) {
		noLoop();
	}
}

function newCircle() {
	let x = random(width);
	let y = random(height);

	let valid = true;
	for (let i = 0; i < circles.length; i++) {
		let d = dist(x, y, circles[i].x, circles[i].y);
		if (d - 2 < circles[i].r) {
			valid = false;
			break;
		}
	}

	if (valid) {
		let index = (int(x) + int(y) * img.width) * 4;
		let red = img.pixels[index];
		let green = img.pixels[index + 1];
		let blue = img.pixels[index + 2];
		return new Circle(x, y, color(red, green, blue));
	} else {
		return null;
	}
}

function stop() {
	noLoop();
}
