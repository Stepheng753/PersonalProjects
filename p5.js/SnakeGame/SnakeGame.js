let canvasWidth = Math.min(0.95 * document.body.clientWidth, 800);
let length = 15;
let squareSize = canvasWidth / length;
let numSquares = Math.pow(length, 2);
let squareArr = [];
let snake = [];
let speed = 6;
let currDir;
let prevDir;
let foodImg;
let prevFoodIndex = -1;
let foodIndex;
let pointDiv = document.getElementById('points');
let moveInProgress;

function preload() {
	foodImg = loadImage('mouse.png');
}

function setup() {
	createCanvas(canvasWidth, canvasWidth);
	moveInProgress = false;
	prevDir = RIGHT_ARROW;
	currDir = 1;
	for (let i = 0; i < numSquares; i++) {
		squareArr.push(new Square(i));
	}
	snake.push(new SnakeBodyPart(parseInt(numSquares / 2), true));
	setRandomFoodIndex();
	pointDiv.innerHTML = snake.length;
}

function draw() {
	background(0);
	for (let i = 0; i < squareArr.length; i++) {
		squareArr[i].draw();
	}

	for (let i = 0; i < snake.length; i++) {
		snake[i].draw();
	}

	drawFood();

	if (frameCount % speed == 0) {
		update(currDir);
		moveInProgress = false;
	}
}

function keyPressed() {
	if (!moveInProgress) {
		if (keyCode == LEFT_ARROW && prevDir != RIGHT_ARROW) {
			currDir = -1;
			prevDir = keyCode;
		}
		if (keyCode == UP_ARROW && prevDir != DOWN_ARROW) {
			currDir = -length;
			prevDir = keyCode;
		}
		if (keyCode == RIGHT_ARROW && prevDir != LEFT_ARROW) {
			currDir = 1;
			prevDir = keyCode;
		}
		if (keyCode == DOWN_ARROW && prevDir != UP_ARROW) {
			currDir = length;
			prevDir = keyCode;
		}
		moveInProgress = true;
	}
}

function update(d_index) {
	let headPos = snake[0].getCurrPos();
	let newHeadPos = headPos + d_index;
	snake[0].path.push(newHeadPos);
	if (headPos == foodIndex) {
		prevFoodIndex = foodIndex;
		setRandomFoodIndex();
	}
	if (snake[0].getNFromEndPos(snake.length) == prevFoodIndex) {
		snake.push(new SnakeBodyPart(prevFoodIndex));
		prevFoodIndex = -1;
		pointDiv.innerHTML = snake.length;
	}
	for (let i = 1; i < snake.length; i++) {
		snake[i].path.push(snake[0].getNFromEndPos(i));
	}

	let hitTopBottom = newHeadPos < 0 || newHeadPos >= numSquares;
	let hitLeftRight = parseInt(newHeadPos / length) != parseInt(headPos / length);
	let movingUpDown = currDir == -length || currDir == length;
	let movingLeftRight = currDir == -1 || currDir == 1;

	if ((hitTopBottom && movingUpDown) || (hitLeftRight && movingLeftRight)) {
		noLoop();
	}

	for (let i = 1; i < snake.length; i++) {
		if (newHeadPos == snake[i].getCurrPos()) {
			noLoop();
		}
	}
}

function drawFood() {
	let x = convertIndexToCoordinate(foodIndex).x;
	let y = convertIndexToCoordinate(foodIndex).y;
	image(foodImg, x, y, squareSize, squareSize);
}

function setRandomFoodIndex() {
	let randFoodIndex;
	let isOverlapped;
	do {
		isOverlapped = false;
		randFoodIndex = parseInt(Math.random() * numSquares);
		for (let i = 0; i < snake.length; i++) {
			if (randFoodIndex == snake[i].getCurrPos() || randFoodIndex == foodIndex) {
				isOverlapped = true;
			}
		}
	} while (isOverlapped);

	foodIndex = randFoodIndex;
}
