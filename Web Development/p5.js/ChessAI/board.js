let canvasSize = 900;
let numRows = 8;
let numCols = 8;
let squares = new Array(64);
let pieces = new Array(64);
let img;
let currLegalMoves = [];
let originalIndex = -1;
let isWhitesTurn = true;
let moves = [];

function setup() {
	createCanvas(canvasSize, canvasSize);
	initChess();
}

function draw() {
	drawSquares();
	drawAllPieces();
	// checkForCheck();
}

function drawAllPieces() {
	for (let i = 0; i < pieces.length; i++) {
		if (pieces[i] && pieces[i] != 0) {
			pieces[i].drawPiece();
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
	for (let i = 0; i < pieces.length; i++) {
		if ((i % 2 == 1 && Math.floor(i / numRows) % 2 == 0) || (i % 2 == 0 && Math.floor(i / numRows) % 2 == 1)) {
			squares[i] = '#A3524C';
		} else {
			squares[i] = 255;
		}
	}
}

function initEmptySpace() {
	for (let i = 16; i <= 47; i++) {
		pieces[i] = 0;
	}
}

function initPawns() {
	for (let i = 8; i < 16; i++) {
		pieces[i] = new Pawn(i, false);
	}
	for (let i = 48; i < 56; i++) {
		pieces[i] = new Pawn(i, true);
	}
}

function initBishops() {
	pieces[2] = new Bishop(2, false);
	pieces[5] = new Bishop(5, false);
	pieces[58] = new Bishop(58, true);
	pieces[61] = new Bishop(61, true);
}

function initKnights() {
	pieces[1] = new Knight(1, false);
	pieces[6] = new Knight(6, false);
	pieces[57] = new Knight(57, true);
	pieces[62] = new Knight(62, true);
}

function initRooks() {
	pieces[0] = new Rook(0, false);
	pieces[7] = new Rook(7, false);
	pieces[56] = new Rook(56, true);
	pieces[63] = new Rook(63, true);
}

function initQueens() {
	pieces[3] = new Queen(3, false);
	pieces[59] = new Queen(59, true);
}

function initKings() {
	pieces[4] = new King(4, false);
	pieces[60] = new King(60, true);
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
	if (mouseX >= 0 && mouseX <= canvasSize && mouseY >= 0 && mouseY <= canvasSize) {
		let index = convertPixelToIndex(mouseX, mouseY);
		if (
			((originalIndex < 0 && pieces[index] != 0) || pieces[index] != 0) &&
			pieces[index].isWhite == isWhitesTurn
		) {
			initSquares();
			squares[index] = '#e9eba2';

			if (checkForCheck(true)) {
				let possibleMoves = pieces[convertPixelToIndex(mouseX, mouseY)].getLegalMoves(false);
				currLegalMoves = [];
				console.log(possibleMoves);
				for (let i = 0; i < possibleMoves.length; i++) {
					let ogTemp = pieces[index];
					let newTemp = pieces[possibleMoves[i][0]];

					pieces[index] = 0;
					pieces[possibleMoves[i][0]] = ogTemp;

					if (!checkForCheck(false)) {
						currLegalMoves.push(possibleMoves[i]);
					}
					pieces[index] = ogTemp;
					pieces[possibleMoves[i][0]] = newTemp;
				}

				for (let i = 0; i < currLegalMoves.length; i++) {
					squares[currLegalMoves[i][0]] = '#59b381';
				}
			} else {
				currLegalMoves = pieces[convertPixelToIndex(mouseX, mouseY)].getLegalMoves(true);
			}
			originalIndex = index;
			return;
		}
		let foundElement = findsArray2D(currLegalMoves, index);
		if (foundElement[0] != -1) {
			let temp = pieces[originalIndex];
			temp.index = index;
			pieces[originalIndex] = 0;
			pieces[index] = temp;
			pieces[index].numMoves++;
			moves.push([pieces[index], originalIndex, index]);

			// En Pessant
			let indexingDirection = pieces[index].isWhite ? 1 : -1;
			if (foundElement[1] == 'e.p.') {
				pieces[index + indexingDirection * numRows] = 0;
			}

			// Castle
			if (foundElement[1] == '0-0' || foundElement[1] == '0-0-0') {
				if (index < originalIndex) {
					pieces[index + 1] = pieces[index - (index % numRows)];
					pieces[index + 1].numMoves++;
					pieces[index + 1].index = index + 1;
					moves.push([pieces[index + 1], index - (index % numRows), index + 1]);
				} else if (index > originalIndex) {
					pieces[index - 1] = pieces[index + (numRows - 1) - (index % numRows)];
					pieces[index - 1].numMoves++;
					pieces[index - 1].index = index - 1;
					moves.push([pieces[index - 1], index + (numRows - 1) - (index % numRows), index - 1]);
				}
			}

			isWhitesTurn = !isWhitesTurn;
			initSquares();
			squares[originalIndex] = '#e9eba2';

			// Capture
			if (foundElement[1] == 'x') {
				squares[index] = '#4d6cfa';
			} else {
				squares[index] = '#e9eba2';
			}

			checkForCheck(true);
		} else {
			initSquares();
		}
		originalIndex = -1;
		currLegalMoves = [];
	}
}

function checkForCheck(show) {
	let kingIndex = getKingIndex();
	for (let i = 0; i < pieces.length; i++) {
		if (pieces[i] != 0 && pieces[i].isWhite != isWhitesTurn) {
			let legalMoves = pieces[i].getLegalMoves(false);
			let foundElement = findsArray2D(legalMoves, kingIndex);
			if (foundElement[0] != -1) {
				if (show) {
					squares[kingIndex] = '#c74343';
				}
				return true;
			}
		}
	}
}

function getKingIndex() {
	return pieces.findIndex((element) => element.isWhite == isWhitesTurn && element.constructor.name == 'King');
}

function findsArray2D(array2D, element) {
	for (let i = 0; i < array2D.length; i++) {
		if (array2D[i].includes(element)) {
			return array2D[i];
		}
	}
	return [-1];
}

function convertPixelToIndex(x, y) {
	return Math.floor(x / (canvasSize / numRows)) + Math.floor(y / (canvasSize / numCols)) * numRows;
}
