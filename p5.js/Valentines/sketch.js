let yesButton;
let noButton;
let yesButtonPressed;
let noButtonPressed;
let yesButtonPressedFrameCt;
let song;
let buttonGap = 50;

let bg;

function preload() {
	airplaneImg = loadImage('./assets/airplane.webp');
	song = loadSound('./assets/Die With A Smile.mp3');

	let ext;
	for (let i = 1; i <= 12; i++) {
		ext = i <= 5 ? 'png' : 'jpg';
		pics.push(loadImage(`./assets/${i}.${ext}`));
	}
	pics.sort(() => 0.5 - Math.random());

	bg = loadImage('./assets/hearts-bg.jpg');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);

	yesButton = createButton('Yes');
	noButton = createButton('No');
	noButton.position(width / 2 + 50, 400);
	yesButtonPressed = false;
	noButtonPressed = false;

	airplanesInfo = [];

	setPicsInfo();
}

function draw() {
	background(bg);
	yesButtonSettings(yesButton, width / 2 - yesButton.size().width - buttonGap, 400);
	noButtonSettings();
	drawAirplane();
	drawCountDown();
	title('Will You Be My Valentines?\n👉👈');
}

function title(titleText) {
	textAlign(CENTER);
	textStyle(BOLD);
	textSize(50);
	fill('#e6695e');
	stroke(0);
	strokeWeight(2);
	text(titleText, width / 2, 200);
}

function yesButtonSettings(button, posX, posY) {
	button.html('Yes');
	button.position(posX, posY);
	button.size(100, 100 * (535 / 600));
	button.mousePressed(() => (yesButtonPressed = true));

	button.style('background-image', 'url(./assets/heart.png)');
	button.style('background-size', 'cover');
	button.style('background-position', 'center');
	button.style('background-color', 'transparent');
	button.style('border', 'none');
	button.style('cursor', 'pointer');
	button.style('color', 'white');
	button.style('font-size', '15px');
	button.style('font-weight', 'bold');
	button.style('text-align', 'center');
	button.style('text-shadow', '1px 1px 1px black');

	if (!yesButtonPressedFrameCt) {
		button.style('transform', 'scale(' + (1 + sin(frameCount / 20) * 0.05) + ')');
	} else {
		// buttonGap = 75;
		button.style('transform', 'scale(' + (frameCount - yesButtonPressedFrameCt) / 50 + ')');
	}

	if (yesButtonPressed) {
		if (!yesButtonPressedFrameCt) {
			song.play();
			song.jump(123);
		}
		yesButtonPressAction();
	}
}

function noButtonSettings() {
	noButton.size(100, 50);
	noButton.mousePressed(() => (noButtonPressed = true));
	noButton.style('cursor', 'pointer');
	noButton.style('font-weight', 'bold');
	noButton.style('font-size', '15px');
	noButton.style('border', '3px solid');

	if (noButton.html() === 'No') {
		if (Math.sqrt(pow(mouseX - noButton.x, 2) + pow(mouseY - noButton.y, 2)) < noButton.width / 2 + 50) {
			let randomX = random(width - noButton.width);
			let randomY = random(height - noButton.height);
			noButton.position(randomX, randomY);
		}
	}

	if (noButtonPressed) {
		yesButtonSettings(noButton, width / 2 + buttonGap, 400);
	}
}

function yesButtonPressAction() {
	noButtonPressed = true;
	yesButtonPressedFrameCt = frameCount;
	airplanesInfo = [];
	let randomNumAirplanes = random(15, 50);
	// let randomNumAirplanes = 15;
	for (let i = 0; i < randomNumAirplanes; i++) {
		airplanesInfo.push(setAirplaneInfo());
	}
	yesButtonPressed = false;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
