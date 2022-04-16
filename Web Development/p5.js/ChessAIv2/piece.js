class Piece {
	constructor(isWhite, numPic) {
		this.isWhite = isWhite;
		this.numMoves = 0;
		this.legalMoves = [];

		this.piecePic = piecesImage.get(
			(numPic * piecesImage.width) / 6,
			this.isWhite ? 0 : piecesImage.height / 2,
			piecesImage.width / 6,
			piecesImage.width / 6
		);
		this.piecePic.resize(squareSize, squareSize);
	}

	drawPiece(index) {
		let pixel = convertIndexToPixel(index);
		image(this.piecePic, pixel.x, pixel.y);
	}

	showLegalMoves() {
		board.initSquares();
		for (let i = 0; i < this.legalMoves.length; i++) {
			squares[this.legalMoves[i].moveFromIndex] = selectionColor;
			squares[this.legalMoves[i].moveToIndex] = legalMoveColor;
		}
	}

	filterCheck(moveFromIndex, piecesParam = [...pieces]) {
		let i = 0;
		while (i < this.legalMoves.length) {
			let currMove = this.legalMoves[i];
			let ogTemp = piecesParam[moveFromIndex];
			let newTemp = piecesParam[currMove.moveToIndex];

			piecesParam[moveFromIndex] = 0;
			piecesParam[currMove.moveToIndex] = ogTemp;

			if (chessGame.checkIfCurrentInCheck(this.isWhite, false, true, [...piecesParam]).check) {
				this.legalMoves = this.legalMoves.filter((value) => {
					return value != currMove;
				});
				i--;
			}

			piecesParam[moveFromIndex] = ogTemp;
			piecesParam[currMove.moveToIndex] = newTemp;
			i++;
		}
	}
}

class Pawn extends Piece {
	constructor(isWhite) {
		super(isWhite, 5);
	}

	getLegalMoves(moveFromIndex, showMoves, runFilterCheck = false, piecesParam = [...pieces]) {
		this.legalMoves = [];
		let end = this.isWhite ? 0 : numRows - 1;
		let indexingDirection = this.getIndexingDirection();

		// If pawn is on starting row, add 2 moves
		let numMovesForward = this.numMoves == 0 ? 2 : 1;
		for (let i = 1; i <= numMovesForward; i++) {
			let possibleMoveIndex = moveFromIndex + indexingDirection * numRows * i;
			if (piecesParam[possibleMoveIndex] == 0) {
				let move = { moveFromIndex: moveFromIndex, moveToIndex: possibleMoveIndex, type: '' };
				if (getRowNum(possibleMoveIndex) == end) {
					move.type = move.type.concat('=');
				}
				this.legalMoves.push(move);
			} else {
				break;
			}
		}

		// Check Pawn Captures
		let leftRightBounds = [
			{ startBound: 0, endBound: numRows - 2, colShift: 1 },
			{ startBound: 1, endBound: numRows - 1, colShift: -1 },
		];
		for (let i = 0; i < leftRightBounds.length; i++) {
			let oneIndexForward = moveFromIndex + indexingDirection * numRows;
			if (
				getColNum(oneIndexForward) >= leftRightBounds[i].startBound &&
				getColNum(oneIndexForward) <= leftRightBounds[i].endBound &&
				getRowNum(oneIndexForward) >= 0 &&
				getRowNum(oneIndexForward) < numRows
			) {
				let oneIndexForwardRightLeft = oneIndexForward + leftRightBounds[i].colShift;
				if (
					piecesParam[oneIndexForwardRightLeft] != 0 &&
					piecesParam[oneIndexForwardRightLeft].isWhite != this.isWhite
				) {
					let move = { moveFromIndex: moveFromIndex, moveToIndex: oneIndexForwardRightLeft, type: 'x' };
					if (getRowNum(oneIndexForwardRightLeft) == end) {
						move.type = move.type.concat('=');
					}
					this.legalMoves.push(move);
				}
			}
		}

		// Check En Passant
		for (let i = 0; i < leftRightBounds.length; i++) {
			if (
				getColNum(moveFromIndex) >= leftRightBounds[i].startBound &&
				getColNum(moveFromIndex) <= leftRightBounds[i].endBound
			) {
				let rightLeftIndex = moveFromIndex + leftRightBounds[i].colShift;
				let rightLeftElement = piecesParam[rightLeftIndex];
				if (
					rightLeftElement != 0 &&
					rightLeftElement.isWhite != this.isWhite &&
					rightLeftElement.constructor.name == 'Pawn' &&
					rightLeftElement.numMoves == 1 &&
					prevMoves[prevMoves.length - 1].piece == rightLeftElement &&
					Math.abs(
						getRowNum(prevMoves[prevMoves.length - 1].moveFromIndex) -
							getRowNum(prevMoves[prevMoves.length - 1].moveToIndex)
					) == 2
				) {
					let move = {
						moveFromIndex: moveFromIndex,
						moveToIndex: rightLeftIndex + indexingDirection * numRows,
						type: 'e.p.',
					};
					this.legalMoves.push(move);
				}
			}
		}

		if (runFilterCheck) {
			this.filterCheck(moveFromIndex, [...piecesParam]);
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}

	getIndexingDirection() {
		return this.isWhite ? -1 : 1;
	}
}

class Bishop extends Piece {
	constructor(isWhite) {
		super(isWhite, 2);
	}

	getLegalMoves(moveFromIndex, showMoves, runFilterCheck = false, piecesParam = [...pieces]) {
		this.legalMoves = [];

		let diag = [
			{ rowShift: numRows, colShift: -1, stopIndex: 7 },
			{ rowShift: numRows, colShift: 1, stopIndex: 0 },
			{ rowShift: -numRows, colShift: -1, stopIndex: 7 },
			{ rowShift: -numRows, colShift: 1, stopIndex: 0 },
		];

		for (let i = 0; i < diag.length; i++) {
			let diagIndex = moveFromIndex + diag[i].colShift + diag[i].rowShift;
			while (getColNum(diagIndex) != diag[i].stopIndex && diagIndex >= 0 && diagIndex < piecesParam.length) {
				if (piecesParam[diagIndex] == 0) {
					this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: diagIndex, type: '' });
				} else if (piecesParam[diagIndex].isWhite != this.isWhite) {
					this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: diagIndex, type: 'x' });
					break;
				} else {
					break;
				}
				diagIndex += diag[i].colShift + diag[i].rowShift;
			}
		}

		if (runFilterCheck) {
			this.filterCheck(moveFromIndex, [...piecesParam]);
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class Knight extends Piece {
	constructor(isWhite) {
		super(isWhite, 3);
	}

	getLegalMoves(moveFromIndex, showMoves, runFilterCheck = false, piecesParam = [...pieces]) {
		this.legalMoves = [];

		let lMoves = [
			{ colShift: -2, rowShift: -numRows },
			{ colShift: 2, rowShift: -numRows },
			{ colShift: -1, rowShift: -2 * numRows },
			{ colShift: 1, rowShift: -2 * numRows },
		];

		for (let i = 0; i < lMoves.length; i++) {
			for (let j = 0; j < 2; j++) {
				let lMoveIndex = moveFromIndex + lMoves[i].colShift + lMoves[i].rowShift;
				if (
					getRowNum(lMoveIndex) - getRowNum(moveFromIndex) == getRowNum(lMoves[i].rowShift) &&
					lMoveIndex >= 0 &&
					lMoveIndex < piecesParam.length
				) {
					if (piecesParam[lMoveIndex] == 0) {
						this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: lMoveIndex, type: '' });
					} else if (piecesParam[lMoveIndex].isWhite != this.isWhite) {
						this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: lMoveIndex, type: 'x' });
					}
				}
				lMoves[i].rowShift *= -1;
			}
		}

		if (runFilterCheck) {
			this.filterCheck(moveFromIndex, [...piecesParam]);
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class Rook extends Piece {
	constructor(isWhite) {
		super(isWhite, 4);
	}

	getLegalMoves(moveFromIndex, showMoves, runFilterCheck = false, piecesParam = [...pieces]) {
		this.legalMoves = [];

		let horzVert = [
			{ shift: -numRows, stopIndex: -1 },
			{ shift: numRows, stopIndex: -1 },
			{ shift: -1, stopIndex: 7 },
			{ shift: 1, stopIndex: 0 },
		];

		for (let i = 0; i < horzVert.length; i++) {
			let horzVertIndex = moveFromIndex + horzVert[i].shift;
			while (horzVertIndex >= 0 && horzVertIndex < piecesParam.length) {
				if (horzVert[i].stopIndex != -1 && getColNum(horzVertIndex) == horzVert[i].stopIndex) {
					break;
				}
				if (piecesParam[horzVertIndex] == 0) {
					this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: horzVertIndex, type: '' });
				} else if (piecesParam[horzVertIndex].isWhite != this.isWhite) {
					this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: horzVertIndex, type: 'x' });
					break;
				} else {
					break;
				}

				horzVertIndex += horzVert[i].shift;
			}
		}

		if (runFilterCheck) {
			this.filterCheck(moveFromIndex, [...piecesParam]);
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class Queen extends Piece {
	constructor(isWhite) {
		super(isWhite, 1);
	}

	getLegalMoves(moveFromIndex, showMoves, runFilterCheck = false, piecesParam = [...pieces]) {
		let diag = new Bishop(this.isWhite).getLegalMoves(moveFromIndex, showMoves, runFilterCheck, piecesParam);
		let horzVert = new Rook(this.isWhite).getLegalMoves(moveFromIndex, showMoves, runFilterCheck, piecesParam);
		this.legalMoves = diag.concat(horzVert);

		if (runFilterCheck) {
			this.filterCheck(moveFromIndex, [...piecesParam]);
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class King extends Piece {
	constructor(isWhite) {
		super(isWhite, 0);
	}

	getLegalMoves(moveFromIndex, showMoves, runFilterCheck = false, piecesParam = [...pieces]) {
		this.legalMoves = [];

		for (let rowShift = -numRows; rowShift <= numRows; rowShift += numRows) {
			for (let colShift = -1; colShift <= 1; colShift++) {
				if (rowShift == colShift && rowShift == 0) {
					continue;
				}

				let borderIndex = moveFromIndex + rowShift + colShift;
				if (
					getRowNum(borderIndex) == getRowNum(borderIndex - colShift) &&
					borderIndex >= 0 &&
					borderIndex < piecesParam.length
				) {
					if (piecesParam[borderIndex] == 0) {
						this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: borderIndex, type: '' });
					} else if (piecesParam[borderIndex].isWhite != this.isWhite) {
						this.legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: borderIndex, type: 'x' });
					}
				}
			}
		}

		// Castling
		let leftRightRookSearch = 1;
		let castlingSpaces = { absoluteRight: -1, absoluteLeft: -1 };
		if (this.numMoves == 0) {
			for (let side in castlingSpaces) {
				let rookIndex = moveFromIndex + leftRightRookSearch;
				let nothingBetween = true;

				while (
					(getColNum(rookIndex) < numRows - 1 && leftRightRookSearch > 0) ||
					(getColNum(rookIndex) > 0 && leftRightRookSearch < 0)
				) {
					if (piecesParam[rookIndex] != 0) {
						nothingBetween = false;
					}
					rookIndex += leftRightRookSearch;
				}

				if (
					piecesParam[rookIndex].constructor.name == 'Rook' &&
					piecesParam[rookIndex].numMoves == 0 &&
					nothingBetween
				) {
					let kingQueenSide = leftRightRookSearch > 0 ? '0-0' : '0-0-0';
					castlingSpaces[side] = moveFromIndex + 2 * leftRightRookSearch;
					this.legalMoves.push({
						moveFromIndex: moveFromIndex,
						moveToIndex: castlingSpaces[side],
						type: kingQueenSide,
					});
				}
				leftRightRookSearch *= -1;
			}
		}

		if (runFilterCheck) {
			this.filterCheck(moveFromIndex, [...piecesParam]);
		}

		let indexLeftRight = -1;
		for (let side in castlingSpaces) {
			let castleIndex = castlingSpaces[side];
			if (castleIndex != -1) {
				let castleMoveToIndex = chessGame.findsLegalMoves(this.legalMoves, castleIndex);
				if (
					castleMoveToIndex != -1 &&
					chessGame.findsLegalMoves(this.legalMoves, castleIndex + indexLeftRight) == -1
				) {
					console.log(castleIndex);
					console.log(castleIndex + indexLeftRight);
					this.legalMoves = this.legalMoves.filter((move) => move.moveToIndex != castleIndex);
				}
			}
			indexLeftRight *= -1;
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}
