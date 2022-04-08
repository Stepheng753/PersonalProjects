const canvasSize = 900;
const numRows = 8;
const numCols = 8;
const squareSize = canvasSize / numRows;
const colLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let squares = new Array(64);
let pieces = new Array(64);
let img;
let moveFromIndex = -1;
let currLegalMoves = [];
let prevMoves = [];
let isWhitesTurn = true;
let promotionMode = false;
const defaultSquareColor = '#A3524C';
const selectionColor = '#e9eba2';
const legalMoveColor = '#59b381';
const captureColor = '#4d6cfa';
const checkColor = '#c74343';
const checkmateColor = '#eb1313';

function setup() {
	createCanvas(canvasSize, canvasSize);
	initChess();
	// setPieces('r7ppp3pp4k7n5P8K4PP5b0R2R3');
}

function initChess() {
	initPawns();
	initBishops();
	initKnights();
	initRooks();
	initQueens();
	initKings();
	initEmptySpace();
	initSquares();
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

function initEmptySpace() {
	for (let i = 0; i < pieces.length; i++) {
		if (!pieces[i]) {
			pieces[i] = 0;
		}
	}
}

function initSquares() {
	for (let i = 0; i < pieces.length; i++) {
		if ((i % 2 == 1 && Math.floor(i / numRows) % 2 == 0) || (i % 2 == 0 && Math.floor(i / numRows) % 2 == 1)) {
			squares[i] = defaultSquareColor;
		} else {
			squares[i] = 255;
		}
	}
	checkIfCurrentInCheck(true);
}

function draw() {
	drawSquares();
	drawAllPieces();

	if (promotionMode) {
		drawPromotionPicker();
	}
}

function drawSquares() {
	for (let i = 0; i < squares.length; i++) {
		let x = convertIndexToPixel(i).x;
		let y = convertIndexToPixel(i).y;
		fill(squares[i]);
		rect(x, y, squareSize, squareSize);
	}
}

function drawAllPieces() {
	for (let i = 0; i < pieces.length; i++) {
		if (pieces[i] && pieces[i] != 0) {
			pieces[i].drawPiece();
		}
	}
}

// Tester: setPieces('rnbqkbnrppppP00p00000000000000000000000000000000PPPPP0PPRNBQKBNR')
function drawPromotionPicker() {
	fill(100, 100, 100, 225);
	rect(0, 0, canvasSize, canvasSize);
	let choices = img.get(img.width / 6, isWhitesTurn ? img.height / 2 : 0, (4 / 6) * img.width, img.width / 6);
	choices.resize(4 * squareSize, squareSize);
	image(choices, 2 * squareSize, 3.5 * squareSize);
}

function mouseClicked() {
	// If in promotion mode, let user choose promotion piece
	if (promotionMode) {
		promotionPicker();
	}

	// Check if user clicked inside canvas
	else if (mouseX >= 0 && mouseX <= canvasSize && mouseY >= 0 && mouseY <= canvasSize) {
		let currIndex = convertPixelToIndex(mouseX, mouseY);

		if (
			((moveFromIndex < 0 && pieces[currIndex] != 0) || // If no piece selected previously, and piece currently selected is a Piece
				pieces[currIndex] != 0) && // If selected a new piece
			pieces[currIndex].isWhite == isWhitesTurn // If piece is of the correct color
		) {
			initSquares();
			squares[currIndex] = selectionColor;
			currLegalMoves = pieces[convertPixelToIndex(mouseX, mouseY)].getLegalMoves(true, true);
			moveFromIndex = currIndex;

			return;
		}

		// If FROM piece is selected, choose TO piece
		let foundIndex = findsLegalMoves(currLegalMoves, currIndex);
		if (foundIndex != -1) {
			let foundElement = currLegalMoves[foundIndex];
			// Change Piece selected to previous piece and update index, and leave previous piece empty
			pieces[moveFromIndex].index = currIndex;
			pieces[currIndex] = pieces[moveFromIndex];
			pieces[currIndex].numMoves++;
			pieces[moveFromIndex] = 0;
			prevMoves.push({
				piece: pieces[currIndex],
				moveFromIndex: moveFromIndex,
				moveToIndex: currIndex,
				type: foundElement.type,
				check: false,
			});

			// En Passant
			// If en passant, remove the piece above/below new space
			if (pieces[currIndex].constructor.name == 'Pawn') {
				let behindDirection = -1 * pieces[currIndex].getIndexingDirection();
				if (foundElement.type == 'e.p.') {
					pieces[currIndex + behindDirection * numRows] = 0;
				}
			}

			// Castle
			if (foundElement.type == '0-0' || foundElement.type == '0-0-0') {
				// Absolute Right Castling, move Rook
				if (currIndex < moveFromIndex) {
					pieces[currIndex + 1] = pieces[currIndex - getColNum(currIndex)];
					pieces[currIndex + 1].numMoves++;
					pieces[currIndex + 1].index = currIndex + 1;
				}
				// Absolute Left Castling, move Rook
				else if (currIndex > moveFromIndex) {
					pieces[currIndex - 1] = pieces[currIndex + (numRows - 1) - getColNum(currIndex)];
					pieces[currIndex - 1].numMoves++;
					pieces[currIndex - 1].index = currIndex - 1;
				}
			}

			// Pawn Promotion
			if (foundElement.type.includes('=')) {
				promotionMode = true;
			}

			isWhitesTurn = !isWhitesTurn; // Switch turns
			initSquares(); // Reset squares
			squares[moveFromIndex] = selectionColor; // Highlighted FROM square

			// Capture
			if (foundElement.type == 'X') {
				squares[currIndex] = captureColor;
			} else {
				squares[currIndex] = selectionColor;
			}

			// Check to see if this move, put opponent in check
			if (checkIfCurrentInCheck(true).check) {
				prevMoves[prevMoves.length - 1].check = true;
			}
		} else {
			initSquares();
		}
		moveFromIndex = -1;
		currLegalMoves = [];
	}
}

function promotionPicker() {
	let y1 = 3.5 * squareSize;
	let y2 = 4.5 * squareSize;
	let promotionIndex = prevMoves[prevMoves.length - 1].moveToIndex;

	let promotionChoices = [
		new Queen(promotionIndex, !isWhitesTurn),
		new Bishop(promotionIndex, !isWhitesTurn),
		new Knight(promotionIndex, !isWhitesTurn),
		new Rook(promotionIndex, !isWhitesTurn),
	];
	for (let i = 2; i < 6; i++) {
		let x1 = i * squareSize;
		let x2 = x1 + squareSize;
		if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
			pieces[promotionIndex] = promotionChoices[i - 2];
			prevMoves[prevMoves.length - 1].type += pieces[promotionIndex].constructor.name[0];
		}
	}
	promotionMode = false;
	checkIfCurrentInCheck(true);
}

/**
 * this function will check if the current player is in check
 * @param {*} show
 * @returns
 */
function checkIfCurrentInCheck(show, checkOnlyCheck = false) {
	let kingIndex = pieces.findIndex(
		(element) => element.isWhite == isWhitesTurn && element.constructor.name == 'King'
	);
	let checkBool = false;

	for (let i = 0; i < pieces.length; i++) {
		if (pieces[i] != 0 && pieces[i].isWhite != isWhitesTurn) {
			let legalMoves = pieces[i].getLegalMoves(false);
			let findIndex = findsLegalMoves(legalMoves, kingIndex);
			if (findIndex != -1) {
				if (show) {
					squares[kingIndex] = checkColor;
				}
				checkBool = true;
				if (checkOnlyCheck) {
					return { check: true, checkmate: false };
				}
			}
		}
	}
	if (checkBool) {
		for (let i = 0; i < pieces.length; i++) {
			if (pieces[i] != 0 && pieces[i].isWhite == isWhitesTurn) {
				let numLegalMoves = pieces[i].getLegalMoves(true, true).length;
				console.log(pieces[i], numLegalMoves);
				if (numLegalMoves > 0) {
					return { check: true, checkmate: false };
				}
			}
		}
		if (show) {
			squares[kingIndex] = checkmateColor;
		}
		return { check: true, checkmate: true };
	}
	return { check: false, checkmate: false };
}

/**
 * -------------------------------------------------
 * HELPER FUNCTIONS
 * -------------------------------------------------
 */
function findsArray2D(array2D, element) {
	for (let i = 0; i < array2D.length; i++) {
		if (array2D[i].includes(element)) {
			return i;
		}
	}
	return -1;
}

function findsLegalMoves(legalMoves, moveIndex) {
	for (let i = 0; i < legalMoves.length; i++) {
		if (legalMoves[i].moveIndex == moveIndex) {
			return i;
		}
	}
	return -1;
}

function convertIndexToPixel(index) {
	let x = getColNum(index) * squareSize;
	let y = getRowNum(index) * squareSize;
	return { x: x, y: y };
}

function convertPixelToIndex(x, y) {
	return Math.floor(x / squareSize) + Math.floor(y / squareSize) * numRows;
}

function getRowNum(index) {
	return Math.floor(index / numRows);
}

function getColNum(index) {
	return index % numRows;
}

function setPieces(piecesString) {
	let stringIndex = 0;
	let piecesIndex = 0;
	while (stringIndex < piecesString.length) {
		let pieceChar = piecesString.charAt(stringIndex++);
		if (pieceChar.toLowerCase() == 'p') {
			pieces[piecesIndex] = new Pawn(piecesIndex++, pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'b') {
			pieces[piecesIndex] = new Bishop(piecesIndex++, pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'n') {
			pieces[piecesIndex] = new Knight(piecesIndex++, pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'r') {
			pieces[piecesIndex] = new Rook(piecesIndex++, pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'q') {
			pieces[piecesIndex] = new Queen(piecesIndex++, pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'k') {
			pieces[piecesIndex] = new King(piecesIndex++, pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'm') {
			isWhitesTurn = false;
		} else {
			pieces[piecesIndex++] = 0;
		}
	}
	checkIfCurrentInCheck(true);
}

function getPieces() {
	let piecesString = '';
	for (let i = 0; i < pieces.length; i++) {
		if (pieces[i] != 0) {
			if (pieces[i].constructor.name == 'Pawn') {
				piecesString += pieces[i].isWhite ? 'P' : 'p';
			} else if (pieces[i].constructor.name == 'Bishop') {
				piecesString += pieces[i].isWhite ? 'B' : 'b';
			} else if (pieces[i].constructor.name == 'Knight') {
				piecesString += pieces[i].isWhite ? 'N' : 'n';
			} else if (pieces[i].constructor.name == 'Rook') {
				piecesString += pieces[i].isWhite ? 'R' : 'r';
			} else if (pieces[i].constructor.name == 'Queen') {
				piecesString += pieces[i].isWhite ? 'Q' : 'q';
			} else if (pieces[i].constructor.name == 'King') {
				piecesString += pieces[i].isWhite ? 'K' : 'k';
			}
		} else {
			piecesString += '0';
		}
	}
	if (!isWhitesTurn) {
		piecesString += 'm';
	}
	return piecesString;
}

function getPrevMoves() {
	let moveString = '';
	for (let i = 0; i < prevMoves.length; i++) {
		let colLetter = colLetters[getColNum(prevMoves[i].moveToIndex)];
		let rowNumber = getRowNum(prevMoves[i].moveToIndex) + 1;
		let moveType = prevMoves[i].type;
		if (prevMoves[i].piece.constructor.name == 'Pawn') {
			if (moveType.includes('x') || moveType == 'e.p.') {
				moveString += colLetters[getColNum(prevMoves[i].moveFromIndex)] + 'x';
			}
			moveString += colLetter.concat(rowNumber);
			if (moveType == 'e.p.') {
				moveString += '(ep)';
			} else if (moveType.includes('=')) {
				moveString += '=' + moveType[moveType.indexOf('=') + 1];
			}
		} else if (prevMoves[i].piece.constructor.name == 'Bishop') {
			moveString += 'B' + moveType + colLetter.concat(rowNumber);
		} else if (prevMoves[i].piece.constructor.name == 'Knight') {
			moveString += 'N' + moveType + colLetter.concat(rowNumber);
		} else if (prevMoves[i].piece.constructor.name == 'Rook') {
			moveString += 'R' + moveType + colLetter.concat(rowNumber);
		} else if (prevMoves[i].piece.constructor.name == 'Queen') {
			moveString += 'Q' + moveType + colLetter.concat(rowNumber);
		} else if (prevMoves[i].piece.constructor.name == 'King') {
			if (moveType.includes('0')) {
				moveString += moveType;
			} else {
				moveString += 'K' + colLetter.concat(rowNumber);
			}
		}
		if (prevMoves[i].check) {
			moveString += '+ ';
		}
		if (i % 2 == 1 && i != prevMoves.length - 1) {
			moveString += ' | ';
		} else {
			moveString += ' ';
		}
	}
	return moveString;
}
