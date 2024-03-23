class ChessGame {
	constructor(flipBoard = false, debugMode = false) {
		this.flipBoard = flipBoard;
		this.debugMode = debugMode;
		this.isWhitesTurn = true;

		this.pieces = new Array(Math.pow(numRows, 2));
		this.squares = new Array(Math.pow(numRows, 2));
		this.prevMoves = [];
		this.initChess();
	}

	initChess() {
		this.initPawns();
		this.initBishops();
		this.initKnights();
		this.initRooks();
		this.initQueens();
		this.initKings();
		this.initEmptySpace();
		this.initSquares();
	}

	initPawns() {
		for (let i = 8; i < 16; i++) this.pieces[i] = new Pawn(false);
		for (let i = 48; i < 56; i++) this.pieces[i] = new Pawn(true);
	}

	initBishops() {
		this.pieces[2] = new Bishop(false);
		this.pieces[5] = new Bishop(false);
		this.pieces[58] = new Bishop(true);
		this.pieces[61] = new Bishop(true);
	}

	initKnights() {
		this.pieces[1] = new Knight(false);
		this.pieces[6] = new Knight(false);
		this.pieces[57] = new Knight(true);
		this.pieces[62] = new Knight(true);
	}

	initRooks() {
		this.pieces[0] = new Rook(false);
		this.pieces[7] = new Rook(false);
		this.pieces[56] = new Rook(true);
		this.pieces[63] = new Rook(true);
	}

	initQueens() {
		this.pieces[3] = new Queen(false);
		this.pieces[59] = new Queen(true);
	}

	initKings() {
		this.pieces[4] = new King(false);
		this.pieces[60] = new King(true);
	}

	initEmptySpace() {
		for (let i = 0; i < this.pieces.length; i++) {
			if (!this.pieces[i]) {
				this.pieces[i] = 0;
			}
		}
	}

	initSquares() {
		for (let i = 0; i < this.squares.length; i++) {
			if ((i % 2 == 1 && Math.floor(i / numRows) % 2 == 0) || (i % 2 == 0 && Math.floor(i / numRows) % 2 == 1)) {
				this.squares[i] = defaultSquareColor;
			} else {
				this.squares[i] = whiteSquareColor;
			}
		}
	}

	/**
	 * Check
	 * MAIN_chessGame.setPieces('rnbqkbnr--ppppqppp--8--8--8--8--PPPP1PPP--RNBPKPNR')
	 *
	 * Checkmate
	 * MAIN_chessGame.setPieces('rnbqkbnr--ppppqppp--8--8--8--8--PPPP1PPP--RNBPKPPR')
	 *
	 * Stalemate
	 * MAIN_chessGame.setPieces('7K--8--6q1--8--8--8--4k3--8')
	 *
	 * MAIN_chessGame.isInCheck(true, false)
	 */
	isInCheck(isWhite, stopAtCheck) {
		let kingIndex = this.getKingIndex(isWhite);

		let checkBool = false;
		for (let i = 0; i < this.pieces.length; i++) {
			if (this.pieces[i] != 0 && this.pieces[i].isWhite != isWhite) {
				let legalMoves = this.getLegalMoves(i, false);
				if (legalMoves.length > 0) {
					let findIndex = findsLegalMoves(legalMoves, kingIndex);
					if (findIndex != -1) {
						checkBool = true;
						if (stopAtCheck) {
							return { check: true, checkmate: false, stalemate: false };
						}
					}
				}
			}
		}
		if (!stopAtCheck) {
			if (checkBool) {
				for (let i = 0; i < this.pieces.length; i++) {
					if (this.pieces[i] != 0 && this.pieces[i].isWhite == isWhite) {
						let legalMoves = this.getLegalMoves(i, true);
						if (legalMoves.length > 0) {
							return { check: true, checkmate: false, stalemate: false };
						}
					}
				}
				return { check: true, checkmate: true, stalemate: false };
			} else {
				for (let i = 0; i < this.pieces.length; i++) {
					if (this.pieces[i] != 0 && this.pieces[i].isWhite == isWhite) {
						let legalMoves = this.getLegalMoves(i, true);
						if (legalMoves.length > 0) {
							return { check: false, checkmate: false, stalemate: false };
						}
					}
				}
				return { check: false, checkmate: false, stalemate: true };
			}
		}
		return { check: false, checkmate: false, stalemate: false };
	}

	filterCheck(legalMoves) {
		let i = 0;
		let sideGame = new ChessGame();
		sideGame.copy(this);

		while (i < legalMoves.length) {
			let currMove = legalMoves[i];
			let undoMove = sideGame.makeMove(currMove, false, false, false);

			if (sideGame.isInCheck(sideGame.pieces[currMove.moveToIndex].isWhite, true).check) {
				legalMoves = legalMoves.filter((value) => {
					return value != currMove;
				});
				i--;
			}

			sideGame.undoMove(undoMove);

			i++;
		}
		return legalMoves;
	}

	getLegalMoves(moveFromIndex, runFilterCheck) {
		let legalMoves = [];

		if (this.pieces[moveFromIndex].constructor.name == 'Pawn') {
			legalMoves = this.pieces[moveFromIndex].getLegalMoves(moveFromIndex, this.pieces, this.prevMoves);
		} else {
			legalMoves = this.pieces[moveFromIndex].getLegalMoves(moveFromIndex, this.pieces);
		}

		if (runFilterCheck && this.pieces[moveFromIndex].constructor.name == 'King') {
			legalMoves = this.checkCastling(moveFromIndex, legalMoves);
		} else if (runFilterCheck) {
			legalMoves = this.filterCheck(legalMoves);
		}
		return legalMoves;
	}

	checkCastling(moveFromIndex, legalMoves) {
		let leftRightRookSearch = 1;
		let castlingSpaces = { absoluteRight: -1, absoluteLeft: -1 };
		if (this.pieces[moveFromIndex].numMoves == 0) {
			for (let side in castlingSpaces) {
				let rookIndex = moveFromIndex + leftRightRookSearch;
				let nothingBetween = true;

				while (
					(getColNum(rookIndex) < numRows - 1 && leftRightRookSearch > 0) ||
					(getColNum(rookIndex) > 0 && leftRightRookSearch < 0)
				) {
					if (this.pieces[rookIndex] != 0) {
						nothingBetween = false;
					}
					rookIndex += leftRightRookSearch;
				}

				if (
					this.pieces[rookIndex].constructor.name == 'Rook' &&
					this.pieces[rookIndex].numMoves == 0 &&
					nothingBetween
				) {
					let kingQueenSide = leftRightRookSearch > 0 ? '0-0' : '0-0-0';
					castlingSpaces[side] = moveFromIndex + 2 * leftRightRookSearch;
					legalMoves.push({
						moveFromIndex: moveFromIndex,
						moveToIndex: castlingSpaces[side],
						type: kingQueenSide,
						value: 0,
					});
				}
				leftRightRookSearch *= -1;
			}
		}

		legalMoves = this.filterCheck(legalMoves);

		// FIlter for any moves in Check.  If move castling space is filtered out, then no castling.
		// If space before castling space is filtered out, remove castling space.
		let indexLeftRight = -1;
		for (let side in castlingSpaces) {
			let castleIndex = castlingSpaces[side];
			if (castleIndex != -1) {
				let castleMoveToIndex = findsLegalMoves(legalMoves, castleIndex);
				let castleLeftRightIndex = findsLegalMoves(legalMoves, castleIndex + indexLeftRight);
				if (castleMoveToIndex != -1 && castleLeftRightIndex == -1) {
					legalMoves = legalMoves.filter((move) => move.moveToIndex != castleIndex);
				}
			}
			indexLeftRight *= -1;
		}

		return legalMoves;
	}

	makeMove(move, show = true, switchTurns = true, checkOpponent = true) {
		let reverseMoves = {
			index: [move.moveFromIndex, move.moveToIndex],
			piece: [this.pieces[move.moveFromIndex], this.pieces[move.moveToIndex]],
		};

		let moveFromPiece = this.pieces[move.moveFromIndex];
		this.pieces[move.moveToIndex] = moveFromPiece;
		this.pieces[move.moveToIndex].numMoves++;
		this.pieces[move.moveFromIndex] = 0;
		let revMove = this.enPassantMove(move);
		if (revMove) {
			reverseMoves.index = reverseMoves.index.concat(revMove.index);
			reverseMoves.piece = reverseMoves.piece.concat(revMove.piece);
		}
		revMove = this.castleMove(move);
		if (revMove) {
			reverseMoves.index = reverseMoves.index.concat(revMove.index);
			reverseMoves.piece = reverseMoves.piece.concat(revMove.piece);
		}
		this.pawnPromotionMove(move);
		let inCheckResult = checkOpponent
			? this.isInCheck(!this.pieces[move.moveToIndex].isWhite, false)
			: { check: null, checkmate: null, stalemate: null };
		this.prevMoves.push({
			piece: moveFromPiece,
			moveFromIndex: move.moveFromIndex,
			moveToIndex: move.moveToIndex,
			type: move.type,
			check: inCheckResult.check,
			checkmate: inCheckResult.checkmate,
			stalemate: inCheckResult.stalemate,
		});
		if (show) {
			this.initSquares();
			this.squares[move.moveFromIndex] = selectionColor;
			if (move.type.includes('x')) {
				this.squares[move.moveToIndex] = captureColor;
			} else {
				this.squares[move.moveToIndex] = selectionColor;
			}
			let kingIndex = this.getKingIndex(!this.pieces[move.moveToIndex].isWhite);
			if (inCheckResult.checkmate) {
				this.squares[kingIndex] = checkmateColor;
			} else if (inCheckResult.check) {
				this.squares[kingIndex] = checkColor;
			}
		}
		if (switchTurns) {
			this.isWhitesTurn = !this.isWhitesTurn;
		}

		return reverseMoves;
	}

	enPassantMove(move) {
		let reverseMove;
		if (this.pieces[move.moveToIndex].constructor.name == 'Pawn') {
			if (move.type == 'e.p.') {
				let behindDirection = -1 * this.pieces[move.moveToIndex].getIndexingDirection();
				reverseMove = {
					index: [move.moveToIndex + behindDirection * numRows],
					piece: [this.pieces[move.moveToIndex + behindDirection * numRows]],
				};
				this.pieces[move.moveToIndex + behindDirection * numRows] = 0;
			}
		}
		return reverseMove;
	}

	castleMove(move) {
		let reverseMove;
		if (move.type == '0-0' || move.type == '0-0-0') {
			// Absolute Right Castling, move Rook
			if (move.moveToIndex < move.moveFromIndex) {
				reverseMove = {
					index: [move.moveToIndex - getColNum(move.moveToIndex), move.moveToIndex + 1],
					piece: [
						this.pieces[move.moveToIndex - getColNum(move.moveToIndex)],
						this.pieces[move.moveToIndex + 1],
					],
				};

				this.pieces[move.moveToIndex + 1] = this.pieces[move.moveToIndex - getColNum(move.moveToIndex)];
				this.pieces[move.moveToIndex + 1].numMoves++;
				this.pieces[move.moveToIndex - getColNum(move.moveToIndex)] = 0;
			}
			// Absolute Left Castling, move Rook
			else if (move.moveToIndex > move.moveFromIndex) {
				reverseMove = {
					index: [move.moveToIndex + (numRows - 1) - getColNum(move.moveToIndex), move.moveToIndex - 1],
					piece: [
						this.pieces[move.moveToIndex + (numRows - 1) - getColNum(move.moveToIndex)],
						this.pieces[move.moveToIndex - 1],
					],
				};

				this.pieces[move.moveToIndex - 1] =
					this.pieces[move.moveToIndex + (numRows - 1) - getColNum(move.moveToIndex)];
				this.pieces[move.moveToIndex - 1].numMoves++;
				this.pieces[move.moveToIndex + (numRows - 1) - getColNum(move.moveToIndex)] = 0;
			}
		}
		return reverseMove;
	}

	pawnPromotionMove(move) {
		if (move.type.includes('=')) {
			let promoteType = move.type.charAt(move.type.length - 1);
			if (promoteType == 'B') {
				this.pieces[move.moveToIndex] = new Bishop(
					this.pieces[move.moveToIndex].isWhite,
					this.pieces[move.moveToIndex].numMoves
				);
			} else if (promoteType == 'N') {
				this.pieces[move.moveToIndex] = new Knight(
					this.pieces[move.moveToIndex].isWhite,
					this.pieces[move.moveToIndex].numMoves
				);
			} else if (promoteType == 'R') {
				this.pieces[move.moveToIndex] = new Rook(
					this.pieces[move.moveToIndex].isWhite,
					this.pieces[move.moveToIndex].numMoves
				);
			} else if (promoteType == 'Q') {
				this.pieces[move.moveToIndex] = new Queen(
					this.pieces[move.moveToIndex].isWhite,
					this.pieces[move.moveToIndex].numMoves
				);
			}
		}
	}

	undoMove(reverseMoves) {
		for (let i = 0; i < reverseMoves.index.length; i++) {
			this.pieces[reverseMoves.index[i]] = reverseMoves.piece[i];
			if (reverseMoves.piece[i] != 0) {
				this.pieces[reverseMoves.index[i]].numMoves--;
			}
		}
		this.prevMoves.pop();
	}

	findBestMove(isWhite, depth) {
		let maxValue = Number.MIN_SAFE_INTEGER;
		let bestMoves = [];
		let sideGame = new ChessGame();
		sideGame.copy(this);

		for (let i = 0; i < sideGame.pieces.length; i++) {
			if (sideGame.pieces[i] != 0 && sideGame.pieces[i].isWhite == isWhite) {
				let legalMoves = sideGame.getLegalMoves(i, false);
				for (let j = 0; j < legalMoves.length; j++) {
					let undoMove = sideGame.makeMove(legalMoves[j], false, false, false);
					if (depth != 1) {
						let opponentBestMove = sideGame.findBestMove(!isWhite, depth - 1);
						if (opponentBestMove.length > 0) {
							legalMoves[j].value -= opponentBestMove[0].value;
						}
					}
					sideGame.undoMove(undoMove);
					if (legalMoves[j].value > maxValue) {
						maxValue = legalMoves[j].value;
						legalMoves[j]['piece'] = this.pieces[i];
						bestMoves = [legalMoves[j]];
					} else if (legalMoves[j].value == maxValue) {
						legalMoves[j]['piece'] = this.pieces[i];
						bestMoves.push(legalMoves[j]);
					}
				}
			}
		}
		return bestMoves;
	}

	getKingIndex(isWhite) {
		return this.pieces.findIndex(
			(piece) => piece != 0 && piece.isWhite == isWhite && piece.constructor.name == 'King'
		);
	}

	copy(chessGame2) {
		this.flipBoard = chessGame2.flipBoard;
		this.debugMode = chessGame2.debugMode;
		this.isWhitesTurn = chessGame2.isWhitesTurn;

		this.squares = [...chessGame2.squares];
		this.prevMoves = [...chessGame2.prevMoves];
		// this.pieces = [...chessGame2.pieces];
		this.pieces = new Array(64);
		for (let i = 0; i < this.pieces.length; i++) {
			if (chessGame2.pieces[i] != 0) {
				if (chessGame2.pieces[i].constructor.name == 'Pawn') {
					this.pieces[i] = new Pawn(chessGame2.pieces[i].isWhite, chessGame2.pieces[i].numMoves);
				} else if (chessGame2.pieces[i].constructor.name == 'Bishop') {
					this.pieces[i] = new Bishop(chessGame2.pieces[i].isWhite, chessGame2.pieces[i].numMoves);
				} else if (chessGame2.pieces[i].constructor.name == 'Knight') {
					this.pieces[i] = new Knight(chessGame2.pieces[i].isWhite, chessGame2.pieces[i].numMoves);
				} else if (chessGame2.pieces[i].constructor.name == 'Rook') {
					this.pieces[i] = new Rook(chessGame2.pieces[i].isWhite, chessGame2.pieces[i].numMoves);
				} else if (chessGame2.pieces[i].constructor.name == 'Queen') {
					this.pieces[i] = new Queen(chessGame2.pieces[i].isWhite, chessGame2.pieces[i].numMoves);
				} else if (chessGame2.pieces[i].constructor.name == 'King') {
					this.pieces[i] = new King(chessGame2.pieces[i].isWhite, chessGame2.pieces[i].numMoves);
				}
			} else {
				this.pieces[i] = 0;
			}
		}
	}

	setPieces(piecesString) {
		let stringIndex = 0;
		let piecesIndex = 0;

		while (stringIndex < piecesString.length) {
			let pieceChar = piecesString.charAt(stringIndex++);
			if (pieceChar.toLowerCase() == 'p') {
				this.pieces[piecesIndex++] = new Pawn(pieceChar.toUpperCase() == pieceChar);
			} else if (pieceChar.toLowerCase() == 'b') {
				this.pieces[piecesIndex++] = new Bishop(pieceChar.toUpperCase() == pieceChar);
			} else if (pieceChar.toLowerCase() == 'n') {
				this.pieces[piecesIndex++] = new Knight(pieceChar.toUpperCase() == pieceChar);
			} else if (pieceChar.toLowerCase() == 'r') {
				this.pieces[piecesIndex++] = new Rook(pieceChar.toUpperCase() == pieceChar);
			} else if (pieceChar.toLowerCase() == 'q') {
				this.pieces[piecesIndex++] = new Queen(pieceChar.toUpperCase() == pieceChar);
			} else if (pieceChar.toLowerCase() == 'k') {
				this.pieces[piecesIndex++] = new King(pieceChar.toUpperCase() == pieceChar);
			} else if (!isNaN(pieceChar)) {
				for (let i = 0; i < parseInt(pieceChar); i++) {
					this.pieces[piecesIndex++] = 0;
				}
			} else if (pieceChar.toLowerCase() == 'm') {
				this.isWhitesTurn = false;
			}
		}
	}

	getPieces() {
		let piecesString = '';
		let countEmpty = 0;

		for (let i = 0; i < this.pieces.length; i++) {
			if (i % 8 == 0 && i != 0) {
				if (countEmpty > 0) {
					piecesString += countEmpty;
					countEmpty = 0;
				}
				piecesString += '--';
			}
			if (this.pieces[i] != 0) {
				if (countEmpty > 0) {
					piecesString += countEmpty;
					countEmpty = 0;
				}
				if (this.pieces[i].constructor.name == 'Pawn') {
					piecesString += this.pieces[i].isWhite ? 'P' : 'p';
				} else if (this.pieces[i].constructor.name == 'Bishop') {
					piecesString += this.pieces[i].isWhite ? 'B' : 'b';
				} else if (this.pieces[i].constructor.name == 'Knight') {
					piecesString += this.pieces[i].isWhite ? 'N' : 'n';
				} else if (this.pieces[i].constructor.name == 'Rook') {
					piecesString += this.pieces[i].isWhite ? 'R' : 'r';
				} else if (this.pieces[i].constructor.name == 'Queen') {
					piecesString += this.pieces[i].isWhite ? 'Q' : 'q';
				} else if (this.pieces[i].constructor.name == 'King') {
					piecesString += this.pieces[i].isWhite ? 'K' : 'k';
				}
			} else {
				countEmpty++;
			}
		}
		if (!this.isWhitesTurn) {
			piecesString += 'm';
		}
		return piecesString;
	}

	getPrevMoves() {
		let moveString = '';
		let i = this.prevMoves.length - 1;
		if (this.prevMoves.length % 2 == 0) {
			i = this.prevMoves.length - 2;
		}
		while (i >= 0) {
			let colLetter = colLetters[getColNum(this.prevMoves[i].moveToIndex)];
			let rowNumber = numRows - getRowNum(this.prevMoves[i].moveToIndex);
			let moveType = this.prevMoves[i].type;
			if (this.prevMoves[i].piece.constructor.name == 'Pawn') {
				if (moveType.includes('x') || moveType == 'e.p.') {
					moveString += colLetters[getColNum(this.prevMoves[i].moveFromIndex)] + 'x';
				}
				moveString += colLetter.concat(rowNumber);
				if (moveType == 'e.p.') {
					moveString += '(ep)';
				} else if (moveType.includes('=') && moveType[moveType.indexOf('=') + 1]) {
					moveString += '=' + moveType[moveType.indexOf('=') + 1];
				}
			} else if (this.prevMoves[i].piece.constructor.name == 'Bishop') {
				moveString += 'B' + moveType + colLetter.concat(rowNumber);
			} else if (this.prevMoves[i].piece.constructor.name == 'Knight') {
				moveString += 'N' + moveType + colLetter.concat(rowNumber);
			} else if (this.prevMoves[i].piece.constructor.name == 'Rook') {
				moveString += 'R' + moveType + colLetter.concat(rowNumber);
			} else if (this.prevMoves[i].piece.constructor.name == 'Queen') {
				moveString += 'Q' + moveType + colLetter.concat(rowNumber);
			} else if (this.prevMoves[i].piece.constructor.name == 'King') {
				if (moveType.includes('0')) {
					moveString += moveType;
				} else {
					moveString += 'K' + moveType + colLetter.concat(rowNumber);
				}
			}
			if (this.prevMoves[i].checkmate) {
				moveString += '# ';
			} else if (this.prevMoves[i].check) {
				moveString += '+ ';
			} else if (this.prevMoves[i].stalemate) {
				moveString += '-½';
			}

			if (this.prevMoves.length % 2 == 1 && i == this.prevMoves.length - 1) {
				moveString += '<br>';
				i -= 2;
			} else if (this.prevMoves[i].piece.isWhite) {
				moveString += ', ';
				i++;
			} else {
				moveString += '<br>';
				i -= 3;
			}
		}
		return moveString;
	}
}
