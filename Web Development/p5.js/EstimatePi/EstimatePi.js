let margin = 10;
let triangleBase = 5;
let bigMargin = margin + triangleBase * 10;
let diameter;
let radius;
let currPt;
let ptsArr = [];
let insideCt = 0;
let totalCt = 0;
let start;
let time = 0;
let piEstimateDom = document.getElementById('estimation');
let percentErrorDom = document.getElementById('percentError');
let insideCtDom = document.getElementById('inside-count');
let totalCtDom = document.getElementById('total-count');

let stopCond;
let ptSize;
let colorSpeed;
let ptSpeed;

function setup() {
	createCanvas(700, 700);
	diameter = height - 2 * bigMargin;
	radius = diameter / 2;
	start = Date.now();
}

function draw() {
	background(0);
	updateInputs();
	translate(width / 2, height / 2);

	drawYAxis();
	drawXAxis();
	drawSquare();
	drawCircle();
	if (stopCond == 0 || totalCt < stopCond) {
		createPts();
		let piEstimate = (4 * insideCt) / totalCt;
		let percentError = (100 * Math.abs(Math.PI - piEstimate)) / Math.PI;
		insideCtDom.innerHTML = 'Inside Circle: ' + insideCt;
		totalCtDom.innerHTML = 'Inside Square: ' + totalCt;
		piEstimateDom.innerHTML = 'Estimated PI: ' + piEstimate.toFixed(10);
		percentErrorDom.innerHTML = 'Percent Error: ' + percentError + '%';
	}
	drawAllPoints();
}

function updateInputs() {
	stopCond = document.getElementById('maxPts').value;
	ptSize = document.getElementById('pointSize').value;
	colorSpeed = document.getElementById('colorSpeed').value;
	ptSpeed = document.getElementById('pointSpeed').value;
}

function createPts() {
	for (let i = 0; i < ptSpeed; i++) {
		currPt = new Point(randomNonInclusive(-1, 1), randomNonInclusive(-1, 1));
		ptsArr.push(currPt);
	}
}

function drawAllPoints() {
	for (let i = 0; i < ptsArr.length; i++) {
		ptsArr[i].drawPoint();
	}
}

function drawYAxis() {
	stroke(255);
	strokeWeight(2);
	let x = 0;
	let topY = -(height / 2 - margin);
	let bottomY = -topY;
	line(x, topY, x, bottomY);

	let triangleBase = 5;
	let triangleHeight = Math.sqrt(Math.pow(triangleBase, 2) - Math.pow(triangleBase / 2, 2));
	triangle(x, topY, x - triangleBase / 2, topY + triangleHeight, x + triangleBase / 2, topY + triangleHeight);
	triangle(
		x,
		bottomY,
		x - triangleBase / 2,
		bottomY - triangleHeight,
		x + triangleBase / 2,
		bottomY - triangleHeight
	);
}

function drawXAxis() {
	stroke(255);
	strokeWeight(2);

	let y = 0;
	let rightX = width / 2 - margin;
	let leftX = -rightX;
	line(leftX, y, rightX, y);

	let triangleHeight = Math.sqrt(Math.pow(triangleBase, 2) - Math.pow(triangleBase / 2, 2));
	triangle(leftX, y, leftX + triangleHeight, y - triangleBase / 2, leftX + triangleHeight, y + triangleBase / 2);
	triangle(rightX, y, rightX - triangleHeight, y - triangleBase / 2, rightX - triangleHeight, y + triangleBase / 2);
}

function drawSquare() {
	noFill();
	stroke(255);
	strokeWeight(2);
	rectMode(CENTER);
	rect(0, 0, diameter, diameter);
}

function drawCircle() {
	noFill();
	stroke(255);
	strokeWeight(2);
	circle(0, 0, diameter);
}

function randomNonInclusive(min, max) {
	let randomNum = random(min, max);
	if (randomNum == min) {
		randomNonInclusive(min, max);
	} else {
		return randomNum;
	}
}

function getTimeAccrued() {
	return (Date.now() - start) / 1000;
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = -y;
		if (this.inCircle()) {
			insideCt++;
		}
		totalCt++;
	}

	drawPoint() {
		time = getTimeAccrued();
		if (this.inCircle()) {
			colorMode(HSB);
			let change = (colorSpeed * time) % 360;
			let strokeCol = map(this.x + this.y, 2 / Math.sqrt(2), -2 / Math.sqrt(2), change, 360 + change);
			if (strokeCol > 360) {
				strokeCol = map(strokeCol, 360, 360 + change, 0, change);
			}
			stroke(strokeCol, 255, 255);
		} else {
			stroke(50);
		}
		strokeWeight(ptSize);
		let mappedX = map(this.x, -1, 1, -radius, radius);
		let mappedY = map(this.y, -1, 1, radius, -radius);
		point(mappedX, mappedY);
	}

	inCircle() {
		return Math.pow(this.x, 2) + Math.pow(this.y, 2) < 1;
	}

	toString() {
		return '(' + this.x + ', ' + this.y + ')';
	}
}
