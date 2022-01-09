let values = [];
let toBeCopied = [];
let comparisons = 0;
let sortDone = -1;

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

	if (isLooping()) {
		str = 'Seconds: ' + round(millis() / 1000, 5);
		text(str, 25, 65);
	} else {
		str = 'Seconds [Animation]: ' + round(millis() / 1000, 5);
		text(str, 25, 65);
	}

	if (sortDone > 0) {
		str = 'Sorted [lap]: ' + sortDone;
		text(str, 25, 95);
	}
}

async function mergeSort(leftArray, rightArray, merged, first) {
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
		} else {
			merged[mergedIndex++] = rightArray[rightIndex++];
		}
	}
	while (leftIndex < leftLength) {
		await sleep();
		merged[mergedIndex++] = leftArray[leftIndex++];
	}
	while (rightIndex < rightLength) {
		await sleep();
		merged[mergedIndex++] = rightArray[rightIndex++];
	}

	if (first) {
		sortDone = round(millis() / 1000, 5);
	}

	for (let i = 0; i < merged.length; i++) {
		await sleep();
		values[minIndex++] = merged[i];
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

		await mergeSort(leftArray, rightArray, array, first);

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

// values = [8,3,9,5,7,8,4,2,1];
// toBeCopied = [8,3,9,5,7,8,4,2,1];

// let valuesIndex = 0;
// let mergedLength;
// mergedLength = width;

// if (mergedLength < merged.length) {
// 	valuesIndex -= merged.length;
// }
// mergedLength = merged.length;

// str = '';
// for (let i = 0; i < values.length; i++) {
// 	str += ' ' + values[i];
// }
// alert(str);
