let canvasWidth = document.body.clientWidth;
let theta1 = Math.PI / 2;
let theta2 = Math.PI / 4;
let dtheta1;
let dtheta2;
let start;
let prevPts;

let g = 1;
let m1 = 10;
let m2 = 10;
let l1;
let l2;

let cx;
let cy;
let buffer;
let px2;
let py2;

const frameSpeed = 1;
const frameDuration = 2000;

function setup() {
	createCanvas(canvasWidth * 0.9, canvasWidth * 0.9);
	colorMode(HSB, 360, 100, 100);
	angleMode(RADIANS);
	l1 = height / 3;
	l2 = height / 8;
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
		let d2theta = calcd2theta();
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

	return [max(-10, min([d2theta1, 10])), max(-10, min([d2theta2, 10]))];
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
	if (px2 && start > 0) {
		buffer.strokeWeight(2);
		buffer.stroke((frameCount - start) % 360, 100, 100);
		buffer.line(px2, py2, x2, y2);
	}
}

function mouseDragged() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		initSim(0);
		angleMode(RADIANS);
		let x = mouseX - cx;
		let y = mouseY - cy;
		let theta = -atan2(y, x) + Math.PI / 2;
		let d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

		if (d >= l1 + l2 || d <= l1 - l2) {
			theta1 = theta;
			theta2 = theta;
		} else {
			innerTheta = acos((Math.pow(l2, 2) - Math.pow(d, 2) - Math.pow(l1, 2)) / (-2 * d * l1));
			if (x < 0) {
				innerTheta *= -1;
			}
			theta1 = theta - innerTheta;
			let x1 = l1 * sin(theta1);
			let y1 = l1 * cos(theta1);
			let dx = -x1 + x;
			let dy = y1 - y;
			theta2 = atan2(dy, dx) + Math.PI / 2;
		}
	}
	return false;
}

function mouseReleased() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		loop();
		initSim(frameCount);
	}
}

function initSim(startCt) {
	loop();
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

window.onload = () => {
	let container = document.getElementById('container');
	let length1Label = document.createElement('label');
	let length1Input = document.createElement('input');
	length1Input.id = 'length1';
	length1Input.type = 'number';
	length1Input.value = 260;
	length1Input.step = 10;
	length1Input.min = 100;
	length1Input.max = height / 3;
	length1Input.onchange = () => updateParameters();
	length1Label.style = 'padding-left: 15px';
	length1Label.innerHTML = 'Length 1';
	container.append(length1Label);
	container.appendChild(length1Input);
	let length2Label = document.createElement('label');
	let length2Input = document.createElement('input');
	length2Input.id = 'length2';
	length2Input.type = 'number';
	length2Input.value = 100;
	length2Input.step = 5;
	length2Input.min = 10;
	length2Input.max = width / 2 - length1Input.value;
	length2Input.onchange = () => updateParameters();
	length2Label.style = 'padding-left: 15px';
	length2Label.innerHTML = 'Length 2';
	container.append(length2Label);
	container.appendChild(length2Input);
};

function updateParameters() {
	let length1Input = document.getElementById('length1');
	let length2Input = document.getElementById('length2');
	length2Input.max = width / 2 - length1Input.value;

	g = float(document.getElementById('gravity').value);
	m1 = float(document.getElementById('mass1').value);
	m2 = float(document.getElementById('mass2').value);
	l1 = float(document.getElementById('length1').value);
	l2 = float(document.getElementById('length2').value);
}
