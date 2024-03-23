let canvasWidth = document.body.clientWidth;
let lineHeight = [];
let i = 0;
let comparisons = 0;

function setup() {
	createCanvas(canvasWidth, canvasWidth * 0.75);
	for (let i = 0; i < width; i++) {
		lineHeight.push(int(random(0, height)));
	}
	frameRate(60);

	insertionSort();
}

function draw() {
	background(0);

	for (let i = 0; i < lineHeight.length; i++) {
		colorMode(HSB);
		let lineColor = map(lineHeight[i], 0, height, 0, 360);
		stroke(lineColor, 100, 100);
		line(i, height, i, height - lineHeight[i]);
	}

	fill(255);
	noStroke();
	textFont('Calisto', 24);

	let str = 'Comparisons: ' + comparisons;
	text(str, 25, 35);

	str = 'Seconds: ' + round(millis() / 1000, 5);
	text(str, 25, 65);
}

async function insertionSort() {
	for (let i = 1; i < lineHeight.length; i++) {
		let key = lineHeight[i];
		let shifterIndex = i - 1;
		await sleep();
		while (shifterIndex >= 0 && key < lineHeight[shifterIndex] && comparisons++ >= 0) {
			lineHeight[shifterIndex + 1] = lineHeight[shifterIndex];
			shifterIndex--;
		}
		lineHeight[shifterIndex + 1] = key;
	}
	noLoop();
}

function sleep() {
	return new Promise((resolve) => setTimeout(resolve));
}
