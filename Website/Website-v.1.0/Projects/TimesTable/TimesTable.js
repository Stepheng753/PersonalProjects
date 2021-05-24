let answerInput;
let randNum1 = 0;
let randNum2 = 0;
let points = 0;
let range1 = 12;
let range2 = 12;
let timeTotal = 120;
let timeLeft;
let numAnsWin = timeTotal / 2;
let numInput;
let start = 0;
let stopped = 0;

function setup() {
	let cnv = createCanvas(1000, 400);
	cnv.parent('sketchHolder');

	numInput = createInput('');
	numInput.position(420, 225, 'fixed');
	numInput.parent('sketchHolder');
	numInput.input(myInputEvent);

	reset();
}

function myInputEvent() {
	answerInput = !isNaN(parseInt(this.value())) ? parseInt(this.value()) : 'Not Number';
}

function keyPressed() {}

function draw() {
	background(0);
	push();
	for (let i = 0; i < points; i++) {
		colorMode(HSB);
		var strokeCol = map((i / numAnsWin) * width, 0, width, 0, 360);
		fill(strokeCol, 100, 100);
		rect((i / numAnsWin) * width, 0, width / numAnsWin, height);
	}
	pop();

	if (isLooping()) {
		timeLeft = (timeTotal - (millis() - start) / 1000).toFixed(2);
		if (timeLeft < 0) {
			timeLeft = 0;
			noLoop();
			draw();
		}

		push();
		fill(0, 0, 0, 100);
		rect(5, 5, 200, 40);
		strokeWeight(5);
		fill(255);
		textSize(20);
		text('Time Left: ' + timeLeft + ' secs', 10, 30);
		pop();

		push();
		fill(0, 0, 0, 100);
		rect(890, 5, 100, 40);
		strokeWeight(5);
		fill(255);
		textSize(20);
		text('Points: ' + points, 900, 30);
		pop();

		push();
		fill(0, 0, 0, 100);
		rect(400, 140, 200, 125);
		strokeWeight(5);
		fill(255);
		textSize(45);
		text(randNum1 + ' × ' + randNum2, 425, 200);
		pop();

		if (answerInput == randNum1 * randNum2) {
			points++;
			randNum1 = floor(random(0, range1 + 1));
			randNum2 = floor(random(0, range2 + 1));
			numInput.value('');
			answerInput = null;
		}
	} else {
		loop();
		numInput.hide();
		push();
		fill(0, 0, 0, 100);
		rect(40, 40, 950, 300);
		strokeWeight(5);
		fill(255);
		textSize(60);
		text('Total Points: ' + points, 325, 100);
		if (points >= numAnsWin) text('Winner Winner!', 325, 200);
		else text('Try Again!', 350, 200);
		text('Points Per Second: ' + (points / timeTotal).toFixed(2), 225, 300);
		pop();
		noLoop();
	}
}

function setVars(num) {
	if (num == 0) range1 = parseInt(document.getElementById('range1Input').value);
	if (num == 1) range2 = parseInt(document.getElementById('range2Input').value);
	if (num == 2) {
		timeTotal = parseInt(document.getElementById('timeInput').value);
		numAnsWin = timeTotal / 2;
	}
	reset();
}

function reset() {
	loop();
	points = 0;
	start = millis();
	randNum1 = floor(random(0, range1 + 1));
	randNum2 = floor(random(0, range2 + 1));
	numInput.show();
}
