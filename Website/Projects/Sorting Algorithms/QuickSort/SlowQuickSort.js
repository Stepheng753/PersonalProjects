let values = [];
let comparisons = 0;

function setup() {
	createCanvas(1000, 400);
	frameRate(60);

	for (var i = 0; i < width; i++) {
		values.push(random(0, height));
	}

	quickSort(values, 0, values.length - 1, true);
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

async function quickSort(array, beginIndex, endIndex, first) {
	if (endIndex > beginIndex) {
		let pivot = array[endIndex];

		let lastBiggerIndex = beginIndex;
		let incrementer = beginIndex;
		while (incrementer <= endIndex) {
			comparisons++;
			if (array[incrementer] > pivot) {
				incrementer++;
			} else {
				await swap(array, incrementer, lastBiggerIndex);
				incrementer++;
				lastBiggerIndex++;
			}
		}

		await quickSort(array, beginIndex, lastBiggerIndex - 2, false);
		await quickSort(array, lastBiggerIndex, endIndex, false);

		if (first) {
			noLoop();
		}
	}
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
