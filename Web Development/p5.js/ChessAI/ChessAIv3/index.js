const canvasSize = 800;
const numRows = 8;
const squareSize = canvasSize / numRows;
const colLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// Color Constants
const whiteSquareColor = '#FFF';
const defaultSquareColor = '#A3524C';
const selectionColor = '#e9eba2';
const legalMoveColor = '#59b381';
const captureColor = '#4d6cfa';
const checkColor = '#c74343';
const checkmateColor = '#eb1313';
const turnIndicatorColor = '#87c987';

let MAIN_chessGame;
let chessAI;
let currLegalMoves = [];
let promotionMoves = [];
let aiBuffer = 1;

function setup() {
	let canvas = createCanvas(canvasSize, canvasSize);
	canvas.parent('container');

	MAIN_chessGame = new ChessGame(false, true);
}

function draw() {
	drawAllSquares();
	drawAllPieces();

	if (promotionMoves.length > 0) {
		drawPromotionPicker();
	}
	if (!MAIN_chessGame.isWhitesTurn && MAIN_chessGame.prevMoves.length > 10 && aiBuffer == 0) {
		console.log('Thinking');
		console.log(MAIN_chessGame.findBestMove(MAIN_chessGame.isWhitesTurn, 2));
		MAIN_chessGame.isWhitesTurn = !MAIN_chessGame.isWhitesTurn;
	} else if (!MAIN_chessGame.isWhitesTurn && MAIN_chessGame.prevMoves.length > 10) {
		aiBuffer -= 1;
	}
}

function mouseClicked() {
	MAIN_chessGame.initSquares();
	if (mouseX >= 0 && mouseX <= canvasSize && mouseY >= 0 && mouseY <= canvasSize) {
		let index = convertPixelToIndex(mouseX, mouseY, MAIN_chessGame.isWhitesTurn, MAIN_chessGame.flipBoard);
		let currentMoveIndex = findsLegalMoves(currLegalMoves, index);

		// Draw Promotion Picker
		if (currentMoveIndex != -1 && currLegalMoves[currentMoveIndex].type.includes('=')) {
			promotionMoves = currLegalMoves.filter((move) => move.moveToIndex == index);
			return;
		}

		// Choose From Promotion Picker
		else if (promotionMoves.length > 0) {
			let y1 = 3.5 * squareSize;
			let y2 = y1 + squareSize;

			for (let i = 0; i < 4; i++) {
				let x1 = (i + 2) * squareSize;
				let x2 = x1 + squareSize;
				if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
					MAIN_chessGame.makeMove(promotionMoves[i]);
				}
			}
		}

		// Select First Piece
		else if (
			MAIN_chessGame.pieces[index] != 0 &&
			MAIN_chessGame.pieces[index].isWhite == MAIN_chessGame.isWhitesTurn
		) {
			currLegalMoves = MAIN_chessGame.getLegalMoves(index, true);

			MAIN_chessGame.squares[index] = selectionColor;
			for (let i = 0; i < currLegalMoves.length; i++) {
				MAIN_chessGame.squares[currLegalMoves[i].moveToIndex] = legalMoveColor;
			}
			return;
		}

		// Make Move
		else if (currentMoveIndex != -1) {
			MAIN_chessGame.makeMove(currLegalMoves[currentMoveIndex]);
		}

		promotionMoves = [];
		currLegalMoves = [];
		document.getElementById('printMoves').innerHTML = MAIN_chessGame.getPrevMoves();
	}
}

function drawAllSquares() {
	for (let i = 0; i < MAIN_chessGame.squares.length; i++) {
		let pixel = convertIndexToPixel(i, MAIN_chessGame.isWhitesTurn, MAIN_chessGame.flipBoard);
		fill(MAIN_chessGame.squares[i]);
		rect(pixel.x, pixel.y, squareSize, squareSize);

		let oppositeColor = MAIN_chessGame.squares[i] == whiteSquareColor ? defaultSquareColor : whiteSquareColor;
		fill(oppositeColor);
		text(
			colLetters[getColNum(i)] + (numRows - getRowNum(i)),
			pixel.x + 0.03 * squareSize,
			pixel.y + 0.15 * squareSize
		);
		if (MAIN_chessGame.debugMode) {
			text(i, pixel.x + 0.83 * squareSize, pixel.y + 0.95 * squareSize);
		}
	}

	let turnIndicatorBar = MAIN_chessGame.isWhitesTurn ? canvasSize : 0;
	if (!MAIN_chessGame.flipBoard) {
		push();
		strokeWeight(15);
		stroke(turnIndicatorColor);
		line(0, turnIndicatorBar, canvasSize, turnIndicatorBar);
		pop();
	}
}

function drawAllPieces() {
	for (let i = 0; i < MAIN_chessGame.pieces.length; i++) {
		if (MAIN_chessGame.pieces[i] != 0) {
			let pixel = convertIndexToPixel(i, MAIN_chessGame.isWhitesTurn, MAIN_chessGame.flipBoard);
			image(MAIN_chessGame.pieces[i].piecePic, pixel.x, pixel.y);
		}
	}
}

function drawPromotionPicker() {
	fill(100, 100, 100, 225);
	rect(0, 0, canvasSize, canvasSize);
	let choices = piecesImage.get(
		piecesImage.width / 6,
		MAIN_chessGame.isWhitesTurn ? 0 : piecesImage.height / 2,
		(4 / 6) * piecesImage.width,
		piecesImage.width / 6
	);
	choices.resize(4 * squareSize, squareSize);
	image(choices, 2 * squareSize, 3.5 * squareSize);
}
