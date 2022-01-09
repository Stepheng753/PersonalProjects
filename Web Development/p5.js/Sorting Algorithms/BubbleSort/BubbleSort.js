let values = [];
let comparisons = 0;

// Beginning Indices
let i = 0;
let j = i + 1;
function setup() {
	createCanvas(1000, 400);
	for (var i = 0; i < width; i++) {
		values.push(random(0, height));
	}
	frameRate(60);
}

function draw() {
	background(0);

	for (let i = 0; i < values.length; i++) {
		colorMode(HSB);
		var strokeCol = map(values[i], 0, height, 0, 360);
		stroke(strokeCol, 100, 100);
		line(i, height, i, height - values[i]);
	}

	// increment j
	if (i < values.length - 1) {
		for (let j = i + 1; j < values.length - 1; j++) {
			comparisons++;
			// Do Swap if needed
			if (values[i] > values[j]) {
				swap(values, i, j);
			}
		}
	} else {
		noLoop();
	}
	i++;

	fill(255);
	noStroke();
	textFont('Calisto', 24);

	let str = 'Comparisons: ' + comparisons;
	text(str, 25, 35);

	str = 'Seconds: ' + round(millis() / 1000, 5);
	text(str, 25, 65);
}

function swap(array, index1, index2) {
	var temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
}
