let values = [];
let toBeCopied = [];
let comparisons = 0;

function setup() {
	createCanvas(1000, 400);
	frameRate(60);

	for (var i = 0; i < width; i++) {
		let rand = random(0, height);
		values.push([i, rand]);
		toBeCopied.push([i, rand]);
	}

	msplit(toBeCopied, true);
}

function draw() {
	background(0);

	for (let i = 0; i < values.length; i++) {
		colorMode(HSB);
		var strokeCol = map(values[i][1], 0, height, 0, 360);
		stroke(strokeCol, 100, 100);
		line(i, height, i, height - values[i][1]);
	}

	fill(255);
	noStroke();
	textFont('Calisto', 24);

	let str = 'Comparisons: ' + comparisons;
	text(str, 25, 35);

	str = 'Seconds: ' + round(millis() / 1000, 5);
	text(str, 25, 65);
}

async function mergeSort(leftArray, rightArray, merged) {
	let leftLength = leftArray.length;
	let rightLength = rightArray.length;
	let leftIndex = 0;
	let rightIndex = 0;
	let mergedIndex = 0;
	let minIndex = findMinIndex(merged);

	while (leftIndex < leftLength && rightIndex < rightLength) {
		await sleep();
		let left = leftArray[leftIndex][1];
		let right = rightArray[rightIndex][1];
		comparisons++;

		if (left < right) {
			merged[mergedIndex++] = leftArray[leftIndex++];
			values[minIndex++] = merged[mergedIndex - 1];
		} else {
			merged[mergedIndex++] = rightArray[rightIndex++];
			values[minIndex++] = merged[mergedIndex - 1];
		}
	}
	while (leftIndex < leftLength) {
		merged[mergedIndex++] = leftArray[leftIndex++];
		values[minIndex++] = merged[mergedIndex - 1];
	}
	while (rightIndex < rightLength) {
		merged[mergedIndex++] = rightArray[rightIndex++];
		values[minIndex++] = merged[mergedIndex - 1];
	}
}

async function msplit(array, first) {
	let arrayLength = array.length;
	if (arrayLength > 1) {
		let halfLength = floor(arrayLength / 2);

		let leftArray = new Array(halfLength);
		let rightArray = new Array(arrayLength - halfLength);

		for (let i = 0; i < halfLength; i++) {
			leftArray[i] = array[i];
		}
		for (let i = halfLength; i < arrayLength; i++) {
			rightArray[i - halfLength] = array[i];
		}

		msplit(leftArray, false);
		msplit(rightArray, false);
		await mergeSort(leftArray, rightArray, array);

		if (first) {
			noLoop();
		}
	}
}

function sleep(ms = 0) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function findMinIndex(array) {
	let min = width + 1;
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] < min) {
			min = array[i][0];
		}
	}
	return min;
}

function printArray(array, str = '') {
	let rtnStr = str;
	for (let i = 0; i < array.length; i++) {
		rtnStr += '[' + array[i] + '], ';
	}
	alert(rtnStr);
}
