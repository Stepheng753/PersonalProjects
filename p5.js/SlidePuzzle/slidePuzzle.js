let source;
let tiles;
let board;
let w;
let h;
let size = 3;
let sizeMin = 3;
let sizeMax = 10;
let moveCounterDom = document.getElementById('move-counter');
let timeCounterDom = document.getElementById('time-counter');
let submitDom = document.getElementById('submitForm');
let solvedDom = document.getElementById('solved');
let numMoves = 0;
let start;
let canvasWidth = document.body.clientWidth;

class Tile {
	constructor(index, img) {
		this.index = index;
		this.img = img;
	}
}

function updateCount() {
	let delta;
	if (start) {
		delta = ((Date.now() - start) / 1000).toFixed(2);
	} else {
		delta = 0;
	}

	moveCounterDom.innerHTML = 'Moves: ' + numMoves;
	timeCounterDom.innerHTML = 'Time: ' + convertSecs(delta);
}

function convertSecs(secs) {
	if (secs >= 0 && secs < 60) {
		return '' + secs + (secs > 1 ? ' secs ' : ' sec ');
	} else if (secs >= 60 && secs < 3600) {
		return (
			'' +
			Math.floor(secs / 60) +
			(Math.floor(secs / 60) > 1 ? ' mins ' : ' min ') +
			convertSecs((secs % 60).toFixed(2))
		);
	} else {
		return (
			'' +
			Math.floor(secs / 3600) +
			(Math.floor(secs / 3600) > 1 ? ' hrs ' : ' hr ') +
			convertSecs((secs % 3600).toFixed(2))
		);
	}
}

function preload() {
	source = loadImage('Icon.png');
	source.resize(canvasWidth * 0.85, 0);
	document.getElementById('sizer').value = size;
	document.getElementById('sizer').min = sizeMin;
	document.getElementById('sizer').max = sizeMax;
	updateCount();
}

function setSize() {
	let sizerVal = parseInt(document.getElementById('sizer').value);
	if (sizerVal >= sizeMin && sizerVal < sizeMax) {
		size = sizerVal;
	}
	reset();
}

function reset(multiplier = 1000) {
	loop();
	tiles = [];
	board = [];
	w = width / size;
	h = height / size;
	numMoves = 0;
	start = null;
	solvedDom.innerHTML = '';

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let x = i * w;
			let y = j * h;

			let img = createImage(w, h);
			img.copy(source, x, y, w, h, 0, 0, w, h);
			console.log(x, y, w, h);

			let index = i + j * size;
			board.push(index);

			let tile = new Tile(index, img);
			tiles.push(tile);
		}
	}
	tiles.pop();
	board.pop();
	board.push(-1);

	shuffleBoard(size * multiplier);
}

function setup() {
	source.resize(canvasWidth * 0.85, 0);
	createCanvas(source.width, source.height);
	frameRate(60);
	reset();
}

function draw() {
	background(255);

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let x = i * w;
			let y = j * h;
			let tileIndex = board[i + j * size];
			if (tileIndex > -1) {
				let img = tiles[tileIndex].img;
				image(img, x, y, w, h);
			} else {
				fill(100);
				rect(x, y, w, h);
			}
		}
	}

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let x = i * w;
			let y = j * h;
			strokeWeight(2);
			noFill();
			rect(x, y, w, h);
		}
	}

	updateCount();
	if (isSolved() && numMoves > 0) {
		solvedDom.innerHTML = 'SOLVED';
		solvedDom.style.paddingBottom = '25px';
		createFormDom();
		noLoop();
	}
}

function randomMove() {
	let randNum1 = floor(random(size));
	let randNum2 = floor(random(size));
	move(randNum1, randNum2);
}

function shuffleBoard(numTimes) {
	for (let i = 0; i < numTimes; i++) {
		randomMove();
	}
}

function mousePressed() {
	let i = floor(mouseX / w);
	let j = floor(mouseY / h);
	move(i, j, true);
}

function move(i, j, updateCounter = false) {
	if (i >= 0 && i < size && j >= 0 && j < size) {
		let blankIndex = findBlank();
		let blankCol = blankIndex % size;
		let blankRow = floor(blankIndex / size);
		if (isNeighbor(i, j, blankCol, blankRow)) {
			swap(board, blankIndex, i + j * size);
			if (updateCounter) {
				if (numMoves == 0) {
					start = Date.now();
				}
				numMoves++;
			}
		}
	}
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
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

function isSolved() {
	for (let i = 0; i < board.length - 1; i++) {
		if (board[i] != tiles[i].index) {
			return false;
		}
	}
	return true;
}

function createFormDom() {
	submitDom.innerHTML += '<label>Enter in Name for Leaderboard:</label>';
	submitDom.innerHTML += '<br>';
	submitDom.innerHTML += "<input type='text' name='name' />";
	submitDom.innerHTML += "<input type='hidden' name='size' id='size' value='" + size + "'/>";
	submitDom.innerHTML += "<input type='hidden' name='numMoves' id='numMoves' value='" + numMoves + "'/>";
	submitDom.innerHTML +=
		"<input type='hidden' name='time' id='time' value='" + ((Date.now() - start) / 1000).toFixed(2) + "'/>";
	submitDom.innerHTML += '<br><br>';
	submitDom.innerHTML += "<input type='submit' name='submit'/>";
	submitDom.style.paddingBottom = '25px';
}

function disable() {
	return false;
}
