let canvasSize = 900;
let numRows = 8;
let numCols = 8;
let squares = new Array(64);
let board = new Array(64);
let img;
let currLegalMoves = [];
let originalIndex = -1;

function setup() {
	createCanvas(canvasSize, canvasSize);
	initChess();
}

function draw() {
	drawSquares();
	drawAllPieces();
}

function drawAllPieces() {
	for (let i = 0; i < board.length; i++) {
		if (board[i] && board[i] != 0) {
			board[i].drawPiece();
		}
	}
}

function drawSquares() {
	for (let i = 0; i < squares.length; i++) {
		let x = (i % numRows) * (canvasSize / numRows);
		let y = Math.floor(i / numRows) * (canvasSize / numCols);
		let width = canvasSize / numRows;
		fill(squares[i]);
		rect(x, y, width, width);
	}
}

function initSquares() {
	for (let i = 0; i < board.length; i++) {
		if ((i % 2 == 1 && Math.floor(i / numRows) % 2 == 0) || (i % 2 == 0 && Math.floor(i / numRows) % 2 == 1)) {
			squares[i] = '#A3524C';
		} else {
			squares[i] = 255;
		}
	}
}

function initEmptySpace() {
	for (let i = 16; i <= 47; i++) {
		board[i] = 0;
	}
}

function initPawns() {
	for (let i = 8; i < 16; i++) {
		board[i] = new Pawn(i, false);
	}
	for (let i = 48; i < 56; i++) {
		board[i] = new Pawn(i, true);
	}
}

function initBishops() {
	board[2] = new Bishop(2, false);
	board[5] = new Bishop(5, false);
	board[58] = new Bishop(58, true);
	board[61] = new Bishop(61, true);
}

function initKnights() {
	board[1] = new Knight(1, false);
	board[6] = new Knight(6, false);
	board[57] = new Knight(57, true);
	board[62] = new Knight(62, true);
}

function initRooks() {
	board[0] = new Rook(0, false);
	board[7] = new Rook(7, false);
	board[56] = new Rook(56, true);
	board[63] = new Rook(63, true);
}

function initQueens() {
	board[3] = new Queen(3, false);
	board[60] = new Queen(60, true);
}

function initKings() {
	board[4] = new King(4, false);
	board[59] = new King(59, true);
}

function initChess() {
	initEmptySpace();
	initSquares();
	initPawns();
	initBishops();
	initKnights();
	initRooks();
	initQueens();
	initKings();
}

function mouseClicked() {
	let index = convertPixelToIndex(mouseX, mouseY);
	if (originalIndex < 0 && board[index] != 0) {
		currLegalMoves = board[convertPixelToIndex(mouseX, mouseY)].showLegalMoves();
		originalIndex = index;
		return;
	} else if (currLegalMoves.includes(index)) {
		let temp = board[originalIndex];
		temp.index = index;
		board[originalIndex] = 0;
		board[index] = temp;
		squares[index] = '#d6d980';
	} else {
		initSquares();
	}
	originalIndex = -1;
	currLegalMoves = [];
}

function convertPixelToIndex(x, y) {
	return Math.floor(x / (canvasSize / numRows)) + Math.floor(y / (canvasSize / numCols)) * numRows;
}
