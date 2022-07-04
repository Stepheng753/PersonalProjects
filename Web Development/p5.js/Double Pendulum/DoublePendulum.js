let canvasWidth = document.body.clientWidth;
let theta1 = Math.PI / 2;
let theta2 = Math.PI / 4;
let dtheta1;
let dtheta2;
let start;
let prevPts;

let l1;
let l2;
let cx;
let cy;
let buffer;
let px2;
let py2;

const frameSpeed = 1;
const frameDuration = 2000;
const g = 1;
const m1 = 10;
const m2 = 10;

function setup() {
	createCanvas(canvasWidth * 0.9, canvasWidth * 0.9);
	colorMode(HSB, 360, 100, 100);
	angleMode(RADIANS);
	l1 = height / 3;
	l2 = height / 8;
	// l1 = 125;
	// l2 = 125;
	cx = width / 2;
	cy = height / 2;

	initSim(1);
}

function draw() {
	background(0);
	imageMode(CORNER);
	image(buffer, 0, 0, width, height);
	translate(cx, cy);

	let x1 = l1 * sin(theta1);
	let y1 = l1 * cos(theta1);
	let x2 = x1 + l2 * sin(theta2);
	let y2 = y1 + l2 * cos(theta2);

	if (start > 0) {
		d2theta = calcd2theta();
		dtheta1 += d2theta[0];
		dtheta2 += d2theta[1];
		theta1 += dtheta1;
		theta2 += dtheta2;

		if (frameCount % frameSpeed == 0) {
			prevPts.push([x2, y2]);
		}
	}

	// drawPrevPts();
	drawTrace(x2, y2);
	drawPendulum(x1, y1, x2, y2);

	px2 = x2;
	py2 = y2;

	if (frameCount - start > frameDuration) {
		noLoop();
	}
}

function calcd2theta() {
	let dtheta1sq = dtheta1 * dtheta1;
	let dtheta2sq = dtheta2 * dtheta2;

	let n1term1 = -g * (2 * m1 + m2) * sin(theta1);
	let n1term2 = -m2 * g * sin(theta1 - 2 * theta2);
	let n1term3a = -2 * sin(theta1 - theta2) * m2;
	let n1term3b = dtheta2sq * l2 + dtheta1sq * l1 * cos(theta1 - theta2);
	let n1term3 = n1term3a * n1term3b;
	let numerator1 = n1term1 + n1term2 + n1term3;

	let d1term1a = l1;
	let d1term1b = 2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2);
	let denominator1 = d1term1a * d1term1b;

	d2theta1 = numerator1 / denominator1;

	let n2term1a = 2 * sin(theta1 - theta2);
	let n2term1b_1 = dtheta1sq * l1 * (m1 + m2);
	let n2term1b_2 = g * (m1 + m2) * cos(theta1);
	let n2term1b_3 = dtheta2sq * l2 * m2 * cos(theta1 - theta2);
	let n2term1b = n2term1b_1 + n2term1b_2 + n2term1b_3;
	let numerator2 = n2term1a * n2term1b;

	let d2term1a = l2;
	let d2term1b = d1term1b;
	let denominator2 = d2term1a * d2term1b;

	d2theta2 = numerator2 / denominator2;

	return [d2theta1, d2theta2];
}

function drawPendulum(x1, y1, x2, y2) {
	stroke(255);
	strokeWeight(2);
	line(0, 0, x1, y1);
	ellipse(x1, y1, m1, m1);
	line(x1, y1, x2, y2);
	ellipse(x2, y2, m2, m2);
}

function drawPrevPts() {
	strokeWeight(5);
	prevPts.forEach((pt, index) => {
		stroke(map(index, 0, prevPts.length, 0, 360), 100, 100);
		point(pt[0], pt[1]);
	});
}

function drawTrace(x2, y2) {
	if (px2) {
		buffer.strokeWeight(2);
		buffer.stroke((frameCount - start) % 360, 100, 100);
		buffer.line(px2, py2, x2, y2);
	}
}

function mousePressed() {
	let theta = atan2(cy - mouseY, mouseX - cx) + Math.PI / 2;
	theta1 = theta;
	theta2 = theta;
	initSim(frameCount);
	console.log(theta1, theta2);
}

function initSim(startCt) {
	start = startCt;
	prevPts = [];
	dtheta1 = 0;
	dtheta2 = 0;
	px2 = null;
	py2 = null;
	buffer = createGraphics(width, height);
	buffer.background(0);
	buffer.colorMode(HSB, 360, 100, 100);
	buffer.translate(cx, cy);
}
