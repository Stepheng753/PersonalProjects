let canvasWidth = document.body.clientWidth;
let order;
let N;
let totalNumPoints;
let path;
let lastPointDrawn;
let drawXPoints;
let repeat;

function initPathVars(orderInt, repeatBool) {
	frameRate(60);
	order = orderInt;
	N = Math.pow(2, order);
	totalNumPoints = Math.pow(N, 2);
	repeat = repeatBool;
	path = [];
	lastPointDrawn = 0;
	drawXPoints = Math.pow(2, 3);

	if (order <= 3) {
		frameRate(3);
		drawXPoints = 1;
	}
}

function initPath() {
	for (let i = 0; i < totalNumPoints; i++) {
		path[i] = hilbert(i, order);
		let length = canvasWidth / N;
		path[i].mult(length); // Scales Path to fit canvas
		path[i].add(length / 2, length / 2); // Offset
	}
}

function hilbert(index, top_order) {
	let orderOnePoints = [createVector(0, 0), createVector(0, 1), createVector(1, 1), createVector(1, 0)];

	let relativeOrderOneIndex = index % 4;
	let relativeOrderOnePoint = orderOnePoints[relativeOrderOneIndex];

	for (let sub_order = 1; sub_order < top_order; sub_order++) {
		// Gets quadrant dependent on each order
		let quadrantIndex = int(index / Math.pow(4, sub_order)) % 4;
		let length = Math.pow(2, sub_order);

		if (quadrantIndex == 0) {
			let swapTemp = relativeOrderOnePoint.x;
			relativeOrderOnePoint.x = relativeOrderOnePoint.y;
			relativeOrderOnePoint.y = swapTemp;
		} else if (quadrantIndex == 1) {
			relativeOrderOnePoint.y += length;
		} else if (quadrantIndex == 2) {
			relativeOrderOnePoint.x += length;
			relativeOrderOnePoint.y += length;
		} else {
			let swapTemp = length - 1 - relativeOrderOnePoint.x;
			relativeOrderOnePoint.x = length - 1 - relativeOrderOnePoint.y;
			relativeOrderOnePoint.y = swapTemp;
			relativeOrderOnePoint.x += length;
		}
	}
	return relativeOrderOnePoint;
}

function drawLines(numPoints, drawWhite) {
	strokeWeight(2);
	noFill();
	for (let i = 1; i < numPoints; i++) {
		if (drawWhite) {
			stroke(360, 0, 100, 0.8);
		} else {
			let hue = map(i, 0, totalNumPoints, 0, 360);
			stroke(hue, 100, 100);
		}
		line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
	}
}

function drawPath(drawWhite) {
	drawLines(lastPointDrawn + drawXPoints, drawWhite);
	lastPointDrawn += drawXPoints;
	if (lastPointDrawn >= totalNumPoints) {
		if (repeat) {
			initPathVars(order, repeat);
			initPath();
		} else {
			noLoop();
		}
	}
}
