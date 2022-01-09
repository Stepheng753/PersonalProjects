let values = [];
let comparisons = 0;

function setup() {
	createCanvas(1000, 400);
	frameRate(60);

	for (var i = 0; i < width; i++) {
		values.push(random(0, height));
	}

	bubbleSort();
}

function draw() {
	background(0);

	for (let i = 0; i < values.length; i++) {
		colorMode(HSB);
		var strokeCol = map(values[i], 0, height, 0, 360);
		stroke(strokeCol, 100, 100);
		line(i, height, i, height - values[i]);
	}

	fill(255);
	noStroke();
	textFont('Calisto', 24);

	let str = 'Comparisons: ' + comparisons;
	text(str, 25, 35);

	str = 'Seconds: ' + round(millis() / 1000, 5);
	text(str, 25, 65);
}

async function bubbleSort() {
	for (let i = 0; i < values.length - 1; i++) {
		for (let j = i + 1; j < values.length; j++) {
			comparisons++;
			if (values[i] > values[j]) {
				await swap(values, i, j);
			}
		}
	}
	noLoop();
}

async function swap(array, index1, index2) {
	await sleep();
	var temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
}

function sleep() {
	return new Promise((resolve) => setTimeout(resolve));
}
