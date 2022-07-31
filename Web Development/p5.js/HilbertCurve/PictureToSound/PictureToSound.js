let osc;
let frequency;
let imgSize;
let showImg;
let hearImg;
let pixels3D;
let hilbertPoints;
let currPoint;

function preload() {
	showImg = loadImage('./External/Lake.jpg');
	hearImg = loadImage('./External/Lake.jpg');
}

function setup() {
	colorMode(HSB, 360, 100, 100);
	initPathVars(6, false);
	initPath();

	initSoundVars();
	initHilbertPoints();
	initOsc();

	createCanvas(imgSize, imgSize);
	hearImg.resize(imgSize, imgSize);
}

function initSoundVars() {
	drawXPoints = 1;
	imgSize = Math.pow(2, order);
	frequency = 0;
	currPoint = 0;
}

function initHilbertPoints() {
	hilbertPoints = [];
	let numPoints = Math.pow(imgSize, 2);
	for (let i = 0; i < numPoints; i++) {
		hilbertPoints[i] = hilbert(i, order);
	}
}

function initOsc() {
	osc = new p5.SinOsc();
	osc.amp(0.1);
	osc.start();
}

function draw() {
	getAudioContext().resume();
	if (frameCount == 1) {
		background(hearImg);
		initPixels3D();
	} else {
		resizeCanvas(canvasWidth, canvasWidth);
		background(showImg);
		updateFrequency();
		drawPath(true);
	}
}

function initPixels3D() {
	loadPixels();
	pixels3D = [];
	let pixelsRow = [];
	let length = width;
	for (let i = 0; i < pixels.length; i += 4) {
		let pixel = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
		pixelsRow.push(pixel);

		if (pixelsRow.length == length) {
			pixels3D.push(pixelsRow);
			pixelsRow = [];
		}
	}
}

function getHSLAColor(index) {
	let row = hilbertPoints[index].y;
	let col = hilbertPoints[index].x;
	let RGBAColor = pixels3D[row][col];
	return RGBAToHSLA(RGBAColor);
}

function updateFrequency() {
	let HSLColor = getHSLAColor(currPoint);
	let frequency = map(HSLColor[0], 0, 100, 100, 600);
	osc.freq(frequency);
	currPoint++;
	if (currPoint >= hilbertPoints.length) {
		if (repeat) {
			currPoint = 0;
			initSoundVars();
		} else {
			osc.stop();
		}
	}
}

function touchStarted() {
	getAudioContext().resume();
}
