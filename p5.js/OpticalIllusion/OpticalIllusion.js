let canvasWidth = 0.95 * document.body.clientWidth;
let outerRadius = 0.4 * canvasWidth;
let innerRadius = outerRadius / 2;
let pointDiameter = 20;
let speed = 1.5;
let circleArr;
let angles;
let numInnerRotations = 1;
let showOuterLines = false;
let showInnerCircles = false;
let hint1 = document.getElementById('hint1');
let hint2 = document.getElementById('hint2');

function setup() {
	createCanvas(canvasWidth, canvasWidth);
	colorMode(HSB);
	angleMode(DEGREES);
	circleArr = [new MovingCircle(0, pointDiameter)];
	angles = [90, 45, 45 + 90, 30, 180 - 30, 60, 180 - 60, 15, 180 - 15, 75, 180 - 75];
}

function draw() {
	background(0);
	translate(canvasWidth / 2, canvasWidth / 2);

	noFill();
	stroke(255);
	circle(0, 0, outerRadius * 2);

	circleArr.forEach((circle) => {
		circle.drawAll();

		if (showOuterLines) {
			circle.drawOuterLine();
		}

		if (showInnerCircles) {
			circle.drawInnerCircle();
			circle.drawInnerLine();
		}
	});

	if (
		numInnerRotations > circleArr.length &&
		circleArr[0].outerCircleTheta == remap(angles[0] - 90)
	) {
		circleArr.push(new MovingCircle(angles[0], pointDiameter));
		angles.shift();
	}

	if (circleArr[0].outerCircleTheta == 270) {
		numInnerRotations++;
	}
}

function remap(angle) {
	if (angle < 0) {
		angle += 360;
	} else if (angle >= 360) {
		angle -= 360;
	}
	return angle;
}

function hint1Button() {
	if (hint1.value == 0) {
		hint1.checked = true;
		hint1.value = 1;
	} else {
		hint1.checked = false;
		hint1.value = 0;
	}
	showOuterLines = !showOuterLines;
}

function hint2Button() {
	if (hint2.value == false) {
		hint2.checked = true;
		hint2.value = 1;
	} else {
		hint2.checked = false;
		hint2.value = 0;
	}
	showInnerCircles = !showInnerCircles;
}

class MovingCircle {
	constructor(theta, diameter) {
		this.d = diameter;

		this.origTheta = theta;
		this.innerCircleTheta = theta + 90;
		this.outerCircleTheta = theta - 90;
	}

	calcPointCenter() {
		this.pointCenterX = this.innerCircleCenterX + innerRadius * cos(this.innerCircleTheta);
		this.pointCenterY = this.innerCircleCenterY + innerRadius * -sin(this.innerCircleTheta);
	}

	drawPoint() {
		fill(color(this.origTheta * 2, 100, 100));
		circle(this.pointCenterX, this.pointCenterY, this.d);
	}

	updatePoint() {
		this.innerCircleTheta -= speed;
		this.innerCircleTheta = remap(this.innerCircleTheta);
	}

	calcInnerCircleCenter() {
		this.innerCircleCenterX = innerRadius * cos(this.outerCircleTheta);
		this.innerCircleCenterY = innerRadius * -sin(this.outerCircleTheta);
	}

	drawInnerCircle() {
		noFill();
		stroke(255);
		circle(this.innerCircleCenterX, this.innerCircleCenterY, outerRadius);
	}

	updateInnerCircle() {
		this.outerCircleTheta += speed;
		this.outerCircleTheta = remap(this.outerCircleTheta);
	}

	drawInnerLine() {
		stroke(color(this.origTheta * 2, 100, 100));
		line(
			this.innerCircleCenterX,
			this.innerCircleCenterY,
			this.pointCenterX,
			this.pointCenterY
		);
	}

	drawOuterLine() {
		stroke(color(this.origTheta * 2, 100, 100));
		line(
			outerRadius * cos(this.origTheta),
			outerRadius * -sin(this.origTheta),
			-outerRadius * cos(this.origTheta),
			-outerRadius * -sin(this.origTheta)
		);
	}

	drawAll() {
		this.calcInnerCircleCenter();
		this.calcPointCenter();

		// this.drawInnerCircle();
		this.drawPoint();
		// this.drawInnerLine();
		// this.drawOuterLine();

		this.updatePoint();
		this.updateInnerCircle();
	}
}
