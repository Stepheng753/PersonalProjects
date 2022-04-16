const canvasSize = 800;
const numRows = 8;
const squareSize = canvasSize / numRows;
const colLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const defaultSquareColor = '#A3524C';
const selectionColor = '#e9eba2';
const legalMoveColor = '#59b381';
const captureColor = '#4d6cfa';
const checkColor = '#c74343';
const checkmateColor = '#eb1313';
const turnIndicatorColor = '#87c987';

let pieces;
let squares;
let board;
let chessGame;
let piecesImage;
let chessAI;
let prevMoves;

function preload() {
	piecesImage = loadImage('Assets/ChessPieces.png');
}

function setup() {
	let canvas = createCanvas(canvasSize, canvasSize);
	canvas.parent('container');

	chessGame = new ChessGame(false, false, true);
}

function draw() {
	chessGame.drawSquares();
	chessGame.drawAllPieces();

	if (chessGame.promotionMode) {
		chessGame.drawPromotionPicker();
	} else if (chessGame.checkmate || chessGame.stalemate) {
		noLoop();
	}
}

function mouseClicked() {
	if (chessGame.promotionMode) {
		pieces = chessGame.promotionPicker(mouseX, mouseY);
	} else if (
		(!chessAI || this.isWhitesTurn != chessAI.isWhite) &&
		mouseX >= 0 &&
		mouseX <= canvasSize &&
		mouseY >= 0 &&
		mouseY <= canvasSize
	) {
		let indexClicked = convertPixelToIndex(mouseX, mouseY);
		if (!chessGame.selectMoveFrom(indexClicked)) {
			pieces = chessGame.selectMoveTo(indexClicked);
		}
	}
}

function convertIndexToPixel(index) {
	if (!chessGame.isWhitesTurn && chessGame.flipBoard) {
		index = 63 - index;
	}
	let x = getColNum(index) * squareSize;
	let y = getRowNum(index) * squareSize;
	return { x: x, y: y };
}

function convertPixelToIndex(x, y) {
	if (!chessGame.isWhitesTurn && chessGame.flipBoard) {
		return 63 - (Math.floor(x / squareSize) + Math.floor(y / squareSize) * numRows);
	}
	return Math.floor(x / squareSize) + Math.floor(y / squareSize) * numRows;
}

function getRowNum(index) {
	return Math.floor(index / numRows);
}

function getColNum(index) {
	return index % numRows;
}

function toggleFlipBoard() {
	chessGame.flipBoard = !chessGame.flipBoard;
}

function toggleAI() {
	if (chessAI) {
		chessAI = null;
	} else {
		chessAI = new AI(false);
	}
}

function setPieces(piecesString) {
	let stringIndex = 0;
	let piecesIndex = 0;
	while (stringIndex < piecesString.length) {
		let pieceChar = piecesString.charAt(stringIndex++);
		if (pieceChar.toLowerCase() == 'p') {
			pieces[piecesIndex++] = new Pawn(pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'b') {
			pieces[piecesIndex++] = new Bishop(pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'n') {
			pieces[piecesIndex++] = new Knight(pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'r') {
			pieces[piecesIndex++] = new Rook(pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'q') {
			pieces[piecesIndex++] = new Queen(pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'k') {
			pieces[piecesIndex++] = new King(pieceChar.toUpperCase() == pieceChar);
		} else if (pieceChar.toLowerCase() == 'm') {
			chessGame.isWhitesTurn = false;
		} else {
			pieces[piecesIndex++] = 0;
		}
	}
	chessGame.checkIfCurrentInCheck(this.isWhitesTurn, true, false);
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
	if (!chessGame.isWhitesTurn) {
		piecesString += 'm';
	}
	return piecesString;
}

function getPrevMoves() {
	let moveString = '';
	let i = prevMoves.length - 1;
	if (prevMoves.length % 2 == 0) {
		i = prevMoves.length - 2;
	}
	while (i >= 0) {
		let colLetter = colLetters[getColNum(prevMoves[i].moveToIndex)];
		let rowNumber = numRows - getRowNum(prevMoves[i].moveToIndex);
		let moveType = prevMoves[i].type;
		if (prevMoves[i].piece.constructor.name == 'Pawn') {
			if (moveType.includes('x') || moveType == 'e.p.') {
				moveString += colLetters[getColNum(prevMoves[i].moveFromIndex)] + 'x';
			}
			moveString += colLetter.concat(rowNumber);
			if (moveType == 'e.p.') {
				moveString += '(ep)';
			} else if (moveType.includes('=') && moveType[moveType.indexOf('=') + 1]) {
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
				moveString += 'K' + moveType + colLetter.concat(rowNumber);
			}
		}
		if (prevMoves[i].checkmate) {
			moveString += '# ';
		} else if (prevMoves[i].check) {
			moveString += '+ ';
		} else if (prevMoves[i].stalemate) {
			moveString += '-½';
		}

		if (prevMoves.length % 2 == 1 && i == prevMoves.length - 1) {
			moveString += '<br>';
			i -= 2;
		} else if (prevMoves[i].piece.isWhite) {
			moveString += ', ';
			i++;
		} else {
			moveString += '<br>';
			i -= 3;
		}
	}
	return moveString;
}
