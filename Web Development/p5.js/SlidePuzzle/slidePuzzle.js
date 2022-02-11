let source;
let tiles = [];
let board = [];
let cols = 3;
let rows = 3;
let fr = 60;
let w;
let h;

class Tile {
	constructor(index, img) {
		this.index = index;
		this.img = img;
	}
}

function preload() {
	source = loadImage('Icon.png');
}

function setup() {
	createCanvas(500, 500);
	frameRate(fr);
	w = width / cols;
	h = height / rows;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * w;
			let y = j * h;

			let img = createImage(w, h);
			img.copy(source, x, y, w, h, 0, 0, w, h);

			let index = i + j * cols;
			board.push(index);

			let tile = new Tile(index, img);
			tiles.push(tile);
		}
	}
	tiles.pop();
	board.pop();
	board.push(-1);

	// shuffleTiles(board);
}

function randomMove() {
	let randNum1 = floor(random(cols));
	let randNum2 = floor(random(rows));
	move(randNum1, randNum2);
}

function shuffleTiles() {
	for (let i = 0; i < 1000; i++) {
		randomMove();
	}
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

function mousePressed() {
	let i = floor(mouseX / w);
	let j = floor(mouseY / h);
	console.log(i, j, cols, rows);
	move(i, j);
}

function draw() {
	background(255);

	if (frameCount < 5 * fr) {
		randomMove();
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * w;
			let y = j * h;
			let tileIndex = board[i + j * cols];
			if (tileIndex > -1) {
				let img = tiles[tileIndex].img;
				image(img, x, y, w, h);
			} else {
				fill(100);
				rect(x, y, w, h);
			}
		}
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * w;
			let y = j * h;
			strokeWeight(2);
			noFill();
			rect(x, y, w, h);
		}
	}

	if (isSolved()) {
		console.log('SOLVED');
	}
}

function isSolved() {
	for (let i = 0; i < board.length - 1; i++) {
		if (board[i] != tiles[i].index) {
			return false;
		}
	}
	return true;
}

function move(i, j) {
	if (i >= 0 && i < cols && j >= 0 && j < rows) {
		let blankIndex = findBlank();
		let blankCol = blankIndex % cols;
		let blankRow = floor(blankIndex / rows);
		if (isNeighbor(i, j, blankCol, blankRow)) {
			swap(board, blankIndex, i + j * cols);
		}
	}
}

function isNeighbor(i, j, x, y) {
	if (i != x && j !== y) {
		return false;
	} else if (abs(i - x) == 1 || abs(j - y) == 1) {
		return true;
	}
	return false;
}

function findBlank() {
	for (let i = 0; i < board.length; i++) {
		if (board[i] == -1) {
			return i;
		}
	}
}
