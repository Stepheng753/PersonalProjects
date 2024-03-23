class ChessGame {
	constructor(chessAI, flipBoard = false, debugMode = false) {
		this.chessAI = chessAI;
		this.flipBoard = flipBoard;
		this.debugMode = debugMode;

		board = new Board();

		this.isWhitesTurn = true;
		this.promotionMode = false;
		this.checkmate = false;
		this.stalemate = false;

		this.moveFromIndex = -1;
		this.currLegalMoves = [];
		prevMoves = [];
	}

	drawSquares() {
		for (let i = 0; i < squares.length; i++) {
			let x = convertIndexToPixel(i).x;
			let y = convertIndexToPixel(i).y;
			fill(squares[i]);
			rect(x, y, squareSize, squareSize);

			let oppositeColor = squares[i] == 255 ? defaultSquareColor : 255;
			fill(oppositeColor);
			text(colLetters[getColNum(i)] + (numRows - getRowNum(i)), x + 0.03 * squareSize, y + 0.15 * squareSize);
			if (this.debugMode) {
				text(i, x + 0.83 * squareSize, y + 0.95 * squareSize);
			}
		}

		let turnIndicatorBar = this.isWhitesTurn ? canvasSize : 0;
		if (!this.flipBoard) {
			push();
			strokeWeight(15);
			stroke(turnIndicatorColor);
			line(0, turnIndicatorBar, canvasSize, turnIndicatorBar);
			pop();
		}
	}

	drawAllPieces() {
		for (let i = 0; i < pieces.length; i++) {
			if (pieces[i] != 0) {
				pieces[i].drawPiece(i);
			}
		}
	}

	drawPromotionPicker() {
		fill(100, 100, 100, 225);
		rect(0, 0, canvasSize, canvasSize);
		let choices = piecesImage.get(
			piecesImage.width / 6,
			this.isWhitesTurn ? 0 : piecesImage.height / 2,
			(4 / 6) * piecesImage.width,
			piecesImage.width / 6
		);
		choices.resize(4 * squareSize, squareSize);
		image(choices, 2 * squareSize, 3.5 * squareSize);
	}

	promotionPicker(mouseXParam, mouseYParam, show = true, piecesParam = [...pieces]) {
		let y1 = 3.5 * squareSize;
		let y2 = 4.5 * squareSize;
		let promotionIndex = prevMoves[prevMoves.length - 1].moveToIndex;

		let promotionChoices = [
			new Queen(this.isWhitesTurn),
			new Bishop(this.isWhitesTurn),
			new Knight(this.isWhitesTurn),
			new Rook(this.isWhitesTurn),
		];
		for (let i = 2; i < 6; i++) {
			let x1 = i * squareSize;
			let x2 = (i + 1) * squareSize;
			if (mouseXParam >= x1 && mouseXParam <= x2 && mouseYParam >= y1 && mouseYParam <= y2) {
				piecesParam[promotionIndex] = promotionChoices[i - 2];
				prevMoves[prevMoves.length - 1].type += piecesParam[promotionIndex].constructor.name[0];
			}
		}
		this.promotionMode = false;
		this.isWhitesTurn = !this.isWhitesTurn;
		this.updatePrevMoves(this.checkIfCurrentInCheck(this.isWhitesTurn, show, false, [...piecesParam]));
		return piecesParam;
	}

	selectMoveFrom(moveFromIndexParam, show = true) {
		if (
			moveFromIndexParam >= 0 &&
			moveFromIndexParam < pieces.length &&
			pieces[moveFromIndexParam] != 0 &&
			pieces[moveFromIndexParam].isWhite == this.isWhitesTurn
		) {
			this.currLegalMoves = pieces[moveFromIndexParam].getLegalMoves(moveFromIndexParam, show, true);
			this.moveFromIndex = moveFromIndexParam;
			return true;
		} else {
			return false;
		}
	}

	selectMoveTo(moveToIndexParam, show = true, piecesParam = [...pieces]) {
		let legalMovesIndex = this.findsLegalMoves(this.currLegalMoves, moveToIndexParam);
		let legalMoveChosen = this.currLegalMoves[legalMovesIndex];
		if (legalMovesIndex >= 0) {
			piecesParam[moveToIndexParam] = piecesParam[this.moveFromIndex];
			piecesParam[moveToIndexParam].numMoves++;
			piecesParam[this.moveFromIndex] = 0;
			prevMoves.push({
				piece: piecesParam[moveToIndexParam],
				moveFromIndex: this.moveFromIndex,
				moveToIndex: moveToIndexParam,
				type: legalMoveChosen.type,
				check: false,
				checkmate: false,
				stalemate: false,
			});

			piecesParam = this.enPassantMove(moveToIndexParam, legalMoveChosen, [...piecesParam]);
			piecesParam = this.castleMove(moveToIndexParam, legalMoveChosen, [...piecesParam]);
			this.pawnPromotionMove(legalMoveChosen);

			this.isWhitesTurn = !this.isWhitesTurn;
			if (show) {
				board.initSquares();
				squares[this.moveFromIndex] = selectionColor;
				if (legalMoveChosen.type == 'x') {
					squares[legalMoveChosen.moveToIndex] = captureColor;
				} else {
					squares[legalMoveChosen.moveToIndex] = selectionColor;
				}
			}
			this.updatePrevMoves(this.checkIfCurrentInCheck(this.isWhitesTurn, show, false, [...piecesParam]));
		} else {
			board.initSquares();
		}

		this.moveFromIndex = -1;
		this.currLegalMoves = [];

		return piecesParam;
	}

	enPassantMove(moveToIndexParam, legalMoveChosen, piecesParam = [...pieces]) {
		// If en passant, remove the piece above/below new space
		if (piecesParam[moveToIndexParam].constructor.name == 'Pawn') {
			let behindDirection = -1 * piecesParam[moveToIndexParam].getIndexingDirection();
			if (legalMoveChosen.type == 'e.p.') {
				piecesParam[moveToIndexParam + behindDirection * numRows] = 0;
			}
		}

		return piecesParam;
	}

	castleMove(moveToIndexParam, legalMoveChosen, piecesParam = [...pieces]) {
		if (legalMoveChosen.type == '0-0' || legalMoveChosen.type == '0-0-0') {
			// Absolute Right Castling, move Rook
			if (moveToIndexParam < this.moveFromIndex) {
				piecesParam[moveToIndexParam + 1] = piecesParam[moveToIndexParam - getColNum(moveToIndexParam)];
				piecesParam[moveToIndexParam + 1].numMoves++;
				piecesParam[moveToIndexParam - getColNum(moveToIndexParam)] = 0;
			}
			// Absolute Left Castling, move Rook
			else if (moveToIndexParam > this.moveFromIndex) {
				piecesParam[moveToIndexParam - 1] =
					piecesParam[moveToIndexParam + (numRows - 1) - getColNum(moveToIndexParam)];
				piecesParam[moveToIndexParam - 1].numMoves++;
				piecesParam[moveToIndexParam + (numRows - 1) - getColNum(moveToIndexParam)] = 0;
			}
		}

		return piecesParam;
	}

	pawnPromotionMove(foundElement) {
		if (foundElement.type.includes('=')) {
			this.promotionMode = true;
			this.isWhitesTurn = !this.isWhitesTurn;
		}
	}

	checkIfCurrentInCheck(isWhite, show, checkOnlyCheck = false, piecesParam = [...pieces]) {
		let kingIndex = piecesParam.findIndex(
			(element) => element.isWhite == isWhite && element.constructor.name == 'King'
		);
		let checkBool = false;
		for (let i = 0; i < piecesParam.length; i++) {
			if (piecesParam[i] != 0 && piecesParam[i].isWhite != isWhite) {
				let legalMoves = piecesParam[i].getLegalMoves(i, false, false, piecesParam);
				if (legalMoves.length > 0) {
					let findIndex = this.findsLegalMoves(legalMoves, kingIndex);
					if (findIndex != -1) {
						if (show) {
							squares[kingIndex] = checkColor;
						}
						checkBool = true;
						if (checkOnlyCheck) {
							return { check: true, checkmate: false, stalemate: false };
						}
					}
				}
			}
		}
		if (!checkOnlyCheck) {
			if (checkBool) {
				for (let i = 0; i < piecesParam.length; i++) {
					if (piecesParam[i] != 0 && piecesParam[i].isWhite == this.isWhitesTurn) {
						let legalMoves = piecesParam[i].getLegalMoves(i, false, true, piecesParam);
						let numLegalMoves = legalMoves.length;
						if (numLegalMoves > 0) {
							return { check: true, checkmate: false, stalemate: false };
						}
					}
				}
				if (show) {
					squares[kingIndex] = checkmateColor;
				}
				this.checkmate = true;
				return { check: true, checkmate: true, stalemate: false };
			} else {
				let stalemateBool = true;
				for (let i = 0; i < piecesParam.length; i++) {
					if (piecesParam[i] != 0 && piecesParam[i].isWhite == this.isWhitesTurn) {
						let numLegalMoves = piecesParam[i].getLegalMoves(i, false, true, piecesParam).length;
						if (numLegalMoves > 0) {
							stalemateBool = false;
							return { check: false, checkmate: false, stalemate: false };
						}
					}
				}
				this.stalemate = true;
				return { check: false, checkmate: false, stalemate: true };
			}
		}
		return { check: false, checkmate: false, stalemate: false };
	}

	updatePrevMoves(checkResult) {
		if (prevMoves.length > 0) {
			prevMoves[prevMoves.length - 1].check = checkResult.check;
			prevMoves[prevMoves.length - 1].checkmate = checkResult.checkmate;
			prevMoves[prevMoves.length - 1].stalemate = checkResult.stalemate;
			document.getElementById('printMoves').innerHTML = getPrevMoves();
		}
	}

	findsLegalMoves(legalMoves, moveToIndex) {
		for (let i = 0; i < legalMoves.length; i++) {
			if (legalMoves[i].moveToIndex == moveToIndex) {
				return i;
			}
		}
		return -1;
	}
}
