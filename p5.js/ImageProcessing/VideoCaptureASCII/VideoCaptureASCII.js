const canvasWidth = document.body.clientWidth * 0.95;
const canvasHeight = canvasWidth;
const density = 'Ñ@#W$9876543210?!abc;:+=-,._                    ';
// const density = reverse('       .:-i|=+%O#@');
// const density = reverse('        .:░▒▓█');

let video;
const colorEmphasize = 1.5;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	video = createCapture(VIDEO);
	video.size(100, 100);
	video.hide();
}

function draw() {
	translate(width, 0);
	scale(-1, 1);
	image(video, 0, 0, width, height);

	video.loadPixels();

	background(0);
	let pixelWidth = width / video.width;
	let pixelHeight = height / video.height;

	for (let i = 0; i < video.width; i++) {
		for (let j = 0; j < video.width; j++) {
			let rgb = getRGB(i, j);
			let bright = getBrightness(rgb);
			let asciiIndex = Math.floor(map(bright, 0, 100, density.length, 0));
			noStroke();
			fill(rgb[0] * colorEmphasize, rgb[1] * colorEmphasize, rgb[2] * colorEmphasize);
			textAlign(CENTER, CENTER);
			textSize(pixelWidth);
			text(density[asciiIndex], i * (pixelWidth + 0.5), j * (pixelHeight + 0.5));
		}
	}
	// noLoop();
}

function getRGB(x, y) {
	let pixelIndex = (x + y * video.width) * 4;
	const red = video.pixels[pixelIndex];
	const green = video.pixels[pixelIndex + 1];
	const blue = video.pixels[pixelIndex + 2];
	return [red, green, blue];
}

function getBrightness(rgb) {
	return brightness(color(rgb[0], rgb[1], rgb[2]));
}

function getAverage(arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum / arr.length;
}

function reverse(s) {
	return [...s].reverse().join('');
}
