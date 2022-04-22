function convertIndexToPixel(index, isWhitesTurn = true, flipBoard = false) {
	if (!isWhitesTurn && flipBoard) {
		index = 63 - index;
	}
	let x = getColNum(index) * squareSize;
	let y = getRowNum(index) * squareSize;
	return { x: x, y: y };
}

function convertPixelToIndex(x, y, isWhitesTurn = true, flipBoard = false) {
	if (!isWhitesTurn && flipBoard) {
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

function findsLegalMoves(legalMoves, moveToIndex) {
	for (let i = 0; i < legalMoves.length; i++) {
		if (legalMoves[i].moveToIndex == moveToIndex) {
			return i;
		}
	}
	return -1;
}

function toggleFlipBoard() {
	MAIN_chessGame.flipBoard = !MAIN_chessGame.flipBoard;
}

function toggleAI() {
	if (chessAI) {
		chessAI = null;
	} else {
		chessAI = new ChessAI(false);
	}
}
