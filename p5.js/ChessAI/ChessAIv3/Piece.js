let piecesImage;

function preload() {
	piecesImage = loadImage('Assets/ChessPieces.png');
}

class Piece {
	constructor(isWhite, drawIndex, value = 0, numMoves = 0) {
		this.isWhite = isWhite;
		this.drawIndex = drawIndex;
		this.value = value;
		this.numMoves = numMoves;

		this.piecePic = piecesImage.get(
			(this.drawIndex * piecesImage.width) / 6,
			this.isWhite ? 0 : piecesImage.height / 2,
			piecesImage.width / 6,
			piecesImage.width / 6
		);
		this.piecePic.resize(squareSize, squareSize);
	}

	getValue() {
		return this.value;
	}
}

class Pawn extends Piece {
	constructor(isWhite, numMoves = 0) {
		super(isWhite, 5, 1, numMoves);
	}

	getIndexingDirection() {
		return this.isWhite ? -1 : 1;
	}

	getLegalMoves(moveFromIndex, pieces, prevMoves) {
		let legalMoves = [];
		let end = this.isWhite ? 0 : numRows - 1;
		let promotionPieces = ['Q', 'B', 'N', 'R'];
		let indexingDirection = this.getIndexingDirection();

		// If pawn is on starting row, add 2 moves
		let numMovesForward = this.numMoves == 0 ? 2 : 1;
		for (let i = 1; i <= numMovesForward; i++) {
			let possibleMoveIndex = moveFromIndex + indexingDirection * numRows * i;
			if (pieces[possibleMoveIndex] == 0) {
				if (getRowNum(possibleMoveIndex) == end) {
					for (let j = 0; j < promotionPieces.length; j++) {
						legalMoves.push({
							moveFromIndex: moveFromIndex,
							moveToIndex: possibleMoveIndex,
							type: '=' + promotionPieces[j],
							value: 0,
						});
					}
				} else {
					legalMoves.push({
						moveFromIndex: moveFromIndex,
						moveToIndex: possibleMoveIndex,
						type: '',
						value: 0,
					});
				}
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
				if (pieces[oneIndexForwardRightLeft] != 0 && pieces[oneIndexForwardRightLeft].isWhite != this.isWhite) {
					if (getRowNum(oneIndexForwardRightLeft) == end) {
						for (let j = 0; j < promotionPieces.length; j++) {
							legalMoves.push({
								moveFromIndex: moveFromIndex,
								moveToIndex: oneIndexForwardRightLeft,
								type: 'x=' + promotionPieces[j],
								value: pieces[oneIndexForwardRightLeft].getValue(),
							});
						}
					} else {
						legalMoves.push({
							moveFromIndex: moveFromIndex,
							moveToIndex: oneIndexForwardRightLeft,
							type: 'x',
							value: pieces[oneIndexForwardRightLeft].getValue(),
						});
					}
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
				let rightLeftElement = pieces[rightLeftIndex];
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
					legalMoves.push({
						moveFromIndex: moveFromIndex,
						moveToIndex: rightLeftIndex + indexingDirection * numRows,
						type: 'e.p.',
						value: rightLeftElement.getValue(),
					});
				}
			}
		}

		return legalMoves;
	}
}

class Bishop extends Piece {
	constructor(isWhite, numMoves = 0) {
		super(isWhite, 2, 3, numMoves);
	}

	getLegalMoves(moveFromIndex, pieces) {
		let legalMoves = [];

		let diag = [
			{ rowShift: numRows, colShift: -1, stopIndex: 7 },
			{ rowShift: numRows, colShift: 1, stopIndex: 0 },
			{ rowShift: -numRows, colShift: -1, stopIndex: 7 },
			{ rowShift: -numRows, colShift: 1, stopIndex: 0 },
		];

		for (let i = 0; i < diag.length; i++) {
			let diagIndex = moveFromIndex + diag[i].colShift + diag[i].rowShift;
			while (getColNum(diagIndex) != diag[i].stopIndex && diagIndex >= 0 && diagIndex < pieces.length) {
				if (pieces[diagIndex] == 0) {
					legalMoves.push({ moveFromIndex: moveFromIndex, moveToIndex: diagIndex, type: '', value: 0 });
				} else if (pieces[diagIndex].isWhite != this.isWhite) {
					legalMoves.push({
						moveFromIndex: moveFromIndex,
						moveToIndex: diagIndex,
						type: 'x',
						value: pieces[diagIndex].getValue(),
					});
					break;
				} else {
					break;
				}
				diagIndex += diag[i].colShift + diag[i].rowShift;
			}
		}

		return legalMoves;
	}
}

class Knight extends Piece {
	constructor(isWhite, numMoves = 0) {
		super(isWhite, 3, 3, numMoves);
	}

	getLegalMoves(moveFromIndex, pieces) {
		let legalMoves = [];

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
					lMoveIndex < pieces.length
				) {
					if (pieces[lMoveIndex] == 0) {
						legalMoves.push({
							moveFromIndex: moveFromIndex,
							moveToIndex: lMoveIndex,
							type: '',
							value: 0,
						});
					} else if (pieces[lMoveIndex].isWhite != this.isWhite) {
						legalMoves.push({
							moveFromIndex: moveFromIndex,
							moveToIndex: lMoveIndex,
							type: 'x',
							value: pieces[lMoveIndex].getValue(),
						});
					}
				}
				lMoves[i].rowShift *= -1;
			}
		}

		return legalMoves;
	}
}

class Rook extends Piece {
	constructor(isWhite, numMoves = 0) {
		super(isWhite, 4, 5, numMoves);
	}

	getLegalMoves(moveFromIndex, pieces) {
		let legalMoves = [];

		let horzVert = [
			{ shift: -numRows, stopIndex: -1 },
			{ shift: numRows, stopIndex: -1 },
			{ shift: -1, stopIndex: 7 },
			{ shift: 1, stopIndex: 0 },
		];

		for (let i = 0; i < horzVert.length; i++) {
			let horzVertIndex = moveFromIndex + horzVert[i].shift;
			while (horzVertIndex >= 0 && horzVertIndex < pieces.length) {
				if (horzVert[i].stopIndex != -1 && getColNum(horzVertIndex) == horzVert[i].stopIndex) {
					break;
				}
				if (pieces[horzVertIndex] == 0) {
					legalMoves.push({
						moveFromIndex: moveFromIndex,
						moveToIndex: horzVertIndex,
						type: '',
						value: 0,
					});
				} else if (pieces[horzVertIndex].isWhite != this.isWhite) {
					legalMoves.push({
						moveFromIndex: moveFromIndex,
						moveToIndex: horzVertIndex,
						type: 'x',
						value: pieces[horzVertIndex].getValue(),
					});
					break;
				} else {
					break;
				}

				horzVertIndex += horzVert[i].shift;
			}
		}

		return legalMoves;
	}
}

class Queen extends Piece {
	constructor(isWhite, numMoves = 0) {
		super(isWhite, 1, 9, numMoves);
	}

	getLegalMoves(moveFromIndex, pieces) {
		let diag = new Bishop(this.isWhite, this.chessGame).getLegalMoves(moveFromIndex, pieces);
		let horzVert = new Rook(this.isWhite, this.chessGame).getLegalMoves(moveFromIndex, pieces);

		return diag.concat(horzVert);
	}
}

class King extends Piece {
	constructor(isWhite, numMoves = 0) {
		super(isWhite, 0, Number.MAX_SAFE_INTEGER, numMoves);
	}

	getLegalMoves(moveFromIndex, pieces) {
		let legalMoves = [];

		for (let rowShift = -numRows; rowShift <= numRows; rowShift += numRows) {
			for (let colShift = -1; colShift <= 1; colShift++) {
				if (rowShift == colShift && rowShift == 0) {
					continue;
				}

				let borderIndex = moveFromIndex + rowShift + colShift;
				if (
					getRowNum(borderIndex) == getRowNum(borderIndex - colShift) &&
					borderIndex >= 0 &&
					borderIndex < pieces.length
				) {
					if (pieces[borderIndex] == 0) {
						legalMoves.push({
							moveFromIndex: moveFromIndex,
							moveToIndex: borderIndex,
							type: '',
							value: 0,
						});
					} else if (pieces[borderIndex].isWhite != this.isWhite) {
						legalMoves.push({
							moveFromIndex: moveFromIndex,
							moveToIndex: borderIndex,
							type: 'x',
							value: pieces[borderIndex].getValue(),
						});
					}
				}
			}
		}

		return legalMoves;
	}
}
