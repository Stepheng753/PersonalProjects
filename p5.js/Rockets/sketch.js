let canvasWidth = document.body.clientWidth;

var population;
var maxDistance;

var count = 0;
var obstacleCount = 0;
var targetCount = 0;
var speciesCount = 1;

var rx = canvasWidth / 4;
var ry = canvasWidth / 2;
var rw = canvasWidth / 2;
var rh = 10;

var target;
var targety = 50;
var targetradius = 20;

var maxForce = 1;
var popsize = 1000;
var lifespan = 500;

var speedThres = 300;
var speedFactor = 2;
var completionFactor = 10;
var crashFactor = 10;

function setup() {
	createCanvas(canvasWidth, canvasWidth);
	frameRate(60);
	target = createVector(width / 2, targety);
	maxDistance = dist(width / 2, targety, width, height);
	population = new Population();
}

function draw() {
	background(0);
	obstacleCount = 0;
	targetCount = 0;

	// Makes the Rockets Move and Stop if Needed
	population.run();

	fill(255);
	text('Frame: ' + count++, 15, 20);
	text('Completed: ' + targetCount, 15, 35);
	text('Species: ' + speciesCount, 15, 50);
	text('Speed Reward Factor: ' + speedFactor, width - 147, 20);
	text('Completion Reward Factor: ' + completionFactor, width - 175, 35);
	text('Crash Punishment Factor: ' + crashFactor, width - 165, 50);

	// When count reaches lifespan,
	// Makes new population based on parent DNA
	if (count == lifespan) {
		count = 0;
		population.evaluate(); // Creates the mating pool based off Parents' DNA
		population.selection(); // Makes the current Rockets, the children Rockets.
		speciesCount++;
	}

	drawObstacle();
	drawTarget();
}

function drawObstacle() {
	colorMode(HSB);

	push();
	let color = map(obstacleCount, 0, popsize, 0, 360);
	fill(color, 100, 100);
	rect(rx, ry, rw, rh);
	pop();
}

function drawTarget() {
	colorMode(HSB);
	let diameter = targetradius * 2;

	push();
	fill(190, 100, 100);
	ellipse(target.x, target.y, diameter, diameter);
	pop();

	push();
	fill(255);
	ellipse(target.x, target.y, diameter - 10, diameter - 10);
	pop();

	push();
	let color = map(targetCount, 0, popsize, 0, 360);
	fill(color, 100, 100);
	ellipse(target.x, target.y, diameter - 20, diameter - 20);
	pop();
}

function rewardPunish(num) {
	if (num == 1) {
		speedFactor += 1;
	} else if (num == 2) {
		completionFactor += 1;
	} else if (num == 3) {
		crashFactor += 1;
	}
}
