// const canvasWidth = document.body.clientWidth * 0.8;
const canvasWidth = 800;
const canvasHeight = canvasWidth;
const density = 'Ñ@#W$9876543210?!abc;:+=-,._                    ';
// const density = '       .:-i|=+%O#@'
// const density = '        .:░▒▓█';

let img;

function preload() {
	img = loadImage('../External/Dog.jpg');
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	img.resize(100, 100);

	background(0);

	let pixelWidth = width / img.width;
	let pixelHeight = height / img.height;

	for (let i = 0; i < img.width; i++) {
		for (let j = 0; j < img.width; j++) {
			let rgb = getRGB(i, j);
			let bright = getBrightness(rgb);
			let asciiIndex = Math.floor(map(bright, 0, 100, density.length, 0));
			noStroke();
			fill(rgb[0], rgb[1], rgb[2]);
			textAlign(CENTER, CENTER);
			textSize(pixelWidth);
			text(density[asciiIndex], i * (pixelWidth + 0.5), j * (pixelHeight + 0.5));
		}
	}
	noLoop();
}

function getRGB(x, y) {
	img.loadPixels();
	let pixelIndex = (x + y * img.width) * 4;
	const red = img.pixels[pixelIndex];
	const green = img.pixels[pixelIndex + 1];
	const blue = img.pixels[pixelIndex + 2];
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
