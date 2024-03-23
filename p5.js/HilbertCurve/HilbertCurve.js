function setup() {
	colorMode(HSB, 360, 100, 100);
	createCanvas(canvasWidth, canvasWidth);
	initPathVars(6, true);
	initPath();
}

function draw() {
	background(0);

	drawPath(false);
}

function changeOrder() {
	let orderInput = document.querySelector('#orderInput');
	initPathVars(orderInput.value, repeat);
	initPath();
}
