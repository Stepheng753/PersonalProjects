function preload() {
	img = loadImage('Assets/ChessPieces.png');
}

class Piece {
	constructor(index, isWhite, numPic) {
		this.index = index;
		this.isWhite = isWhite;
		this.numMoves = 0;
		this.legalMoves = [];

		let y = this.isWhite ? 0 : img.height / 2;
		this.piecePic = img.get((numPic * img.width) / 6, y, img.width / 6, img.width / 6);
		this.piecePic.resize(squareSize, squareSize);
	}

	drawPiece() {
		let x = convertIndexToPixel(this.index).x;
		let y = convertIndexToPixel(this.index).y;
		image(this.piecePic, x, y);
	}

	filterCheck() {
		let i = 0;
		while (i < this.legalMoves.length) {
			let currMove = this.legalMoves[i];
			let ogTemp = pieces[this.index];
			let newTemp = pieces[currMove.moveIndex];

			pieces[this.index] = 0;
			pieces[this.legalMoves[i].moveIndex] = ogTemp;

			// If move puts king in check, remove move from list
			if (checkIfCurrentInCheck(false, true).check) {
				this.legalMoves = this.legalMoves.filter((value) => {
					return value != currMove;
				});
				i--;
			}

			pieces[this.index] = ogTemp;
			pieces[currMove.moveIndex] = newTemp;
			i++;
		}
	}

	showLegalMoves() {
		for (let i = 0; i < this.legalMoves.length; i++) {
			squares[this.legalMoves[i].moveIndex] = legalMoveColor;
		}
	}
}

class Pawn extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 5);
	}

	getLegalMoves(showMoves, runFilterCheck = false) {
		this.legalMoves = [];
		let end = this.isWhite ? 0 : numRows - 1;
		let indexingDirection = this.getIndexingDirection();

		// If pawn is on starting row, add 2 moves
		let numMovesForward = this.numMoves == 0 ? 2 : 1;
		for (let i = 1; i <= numMovesForward; i++) {
			let possibleMoveIndex = this.index + indexingDirection * numRows * i;
			if (pieces[possibleMoveIndex] == 0) {
				let move = { moveIndex: possibleMoveIndex, type: '' };
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
			let oneIndexForward = this.index + indexingDirection * numRows;
			if (
				getColNum(oneIndexForward) >= leftRightBounds[i].startBound &&
				getColNum(oneIndexForward) <= leftRightBounds[i].endBound
			) {
				let oneIndexForwardRightLeft = oneIndexForward + leftRightBounds[i].colShift;
				if (pieces[oneIndexForwardRightLeft] != 0 && pieces[oneIndexForwardRightLeft].isWhite != this.isWhite) {
					let move = { moveIndex: oneIndexForwardRightLeft, type: 'x' };
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
				getColNum(this.index) >= leftRightBounds[i].startBound &&
				getColNum(this.index) <= leftRightBounds[i].endBound
			) {
				let rightLeftIndex = this.index + leftRightBounds[i].colShift;
				let rightLeftElement = pieces[rightLeftIndex];
				if (
					rightLeftElement != 0 &&
					rightLeftElement.isWhite != this.isWhite &&
					rightLeftElement.constructor.name == 'Pawn' &&
					rightLeftElement.numMoves == 1 &&
					prevMoves[prevMoves.length - 1].piece == rightLeftElement
				) {
					this.legalMoves.push({ moveIndex: rightLeftIndex + indexingDirection * numRows, type: 'e.p.' });
				}
			}
		}

		if (runFilterCheck) {
			this.filterCheck();
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
	constructor(index, isWhite) {
		super(index, isWhite, 2);
	}

	getLegalMoves(showMoves, doCheck = false) {
		this.legalMoves = [];

		let diag = [
			{ rowShift: numRows, colShift: -1, stopIndex: 7 },
			{ rowShift: numRows, colShift: 1, stopIndex: 0 },
			{ rowShift: -numRows, colShift: -1, stopIndex: 7 },
			{ rowShift: -numRows, colShift: 1, stopIndex: 0 },
		];

		for (let i = 0; i < diag.length; i++) {
			let diagIndex = this.index + diag[i].colShift + diag[i].rowShift;
			while (getColNum(diagIndex) != diag[i].stopIndex && diagIndex >= 0 && diagIndex < pieces.length) {
				if (pieces[diagIndex] == 0) {
					this.legalMoves.push({ moveIndex: diagIndex, type: '' });
				} else if (pieces[diagIndex].isWhite != this.isWhite) {
					this.legalMoves.push({ moveIndex: diagIndex, type: 'x' });
					break;
				} else {
					break;
				}
				diagIndex += diag[i].colShift + diag[i].rowShift;
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class Knight extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 3);
	}

	getLegalMoves(showMoves, doCheck = false) {
		this.legalMoves = [];

		let lMoves = [
			{ colShift: -2, rowShift: -numRows },
			{ colShift: 2, rowShift: -numRows },
			{ colShift: -1, rowShift: -2 * numRows },
			{ colShift: 1, rowShift: -2 * numRows },
		];

		for (let i = 0; i < lMoves.length; i++) {
			for (let j = 0; j < 2; j++) {
				let lMoveIndex = this.index + lMoves[i].colShift + lMoves[i].rowShift;
				if (
					getRowNum(lMoveIndex) - getRowNum(this.index) == getRowNum(lMoves[i].rowShift) &&
					lMoveIndex >= 0 &&
					lMoveIndex < pieces.length
				) {
					if (pieces[lMoveIndex] == 0) {
						this.legalMoves.push({ moveIndex: lMoveIndex, type: '' });
					} else if (pieces[lMoveIndex].isWhite != this.isWhite) {
						this.legalMoves.push({ moveIndex: lMoveIndex, type: 'x' });
					}
				}
				lMoves[i].rowShift *= -1;
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class Rook extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 4);
	}

	getLegalMoves(showMoves, doCheck = false) {
		this.legalMoves = [];

		let horzVert = [
			{ shift: -numRows, stopIndex: -1 },
			{ shift: numRows, stopIndex: -1 },
			{ shift: -1, stopIndex: 7 },
			{ shift: 1, stopIndex: 0 },
		];

		for (let i = 0; i < horzVert.length; i++) {
			let horzVertIndex = this.index + horzVert[i].shift;
			while (horzVertIndex >= 0 && horzVertIndex < pieces.length) {
				if (horzVert[i].stopIndex != -1 && getColNum(horzVertIndex) == horzVert[i].stopIndex) {
					break;
				}
				if (pieces[horzVertIndex] == 0) {
					this.legalMoves.push({ moveIndex: horzVertIndex, type: '' });
				} else if (pieces[horzVertIndex].isWhite != this.isWhite) {
					this.legalMoves.push({ moveIndex: horzVertIndex, type: 'x' });
					break;
				} else {
					break;
				}

				horzVertIndex += horzVert[i].shift;
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class Queen extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 1);
	}

	getLegalMoves(showMoves, doCheck = false) {
		let diag = new Bishop(this.index, this.isWhite).getLegalMoves(showMoves, doCheck);
		let horzVert = new Rook(this.index, this.isWhite).getLegalMoves(showMoves, doCheck);
		this.legalMoves = diag.concat(horzVert);

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}

class King extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 0);
	}

	getLegalMoves(showMoves, doCheck = false) {
		this.legalMoves = [];

		for (let rowShift = -numRows; rowShift <= numRows; rowShift += numRows) {
			for (let colShift = -1; colShift <= 1; colShift++) {
				if (rowShift == colShift && rowShift == 0) {
					continue;
				}

				let borderIndex = this.index + rowShift + colShift;
				if (
					getRowNum(borderIndex) == getRowNum(borderIndex - colShift) &&
					borderIndex >= 0 &&
					borderIndex < pieces.length
				) {
					if (pieces[borderIndex] == 0) {
						this.legalMoves.push({ moveIndex: borderIndex, type: '' });
					} else if (pieces[borderIndex].isWhite != this.isWhite) {
						this.legalMoves.push({ moveIndex: borderIndex, type: 'x' });
					}
				}
			}
		}

		// Castling
		let leftRightRookSearch = 1;
		let castlingSpaces = { absoluteRight: [], absoluteLeft: [] };
		if (this.numMoves == 0) {
			for (let i = 0; i < 2; i++) {
				let leftRightShifted = this.index + leftRightRookSearch;
				let nothingBetween = true;

				while (
					(getColNum(leftRightShifted) < numRows - 1 && leftRightRookSearch > 0) ||
					(getColNum(leftRightShifted) > 0 && leftRightRookSearch < 0)
				) {
					if (pieces[leftRightShifted] != 0) {
						nothingBetween = false;
					}
					leftRightShifted += leftRightRookSearch;
				}

				if (
					pieces[leftRightShifted].constructor.name == 'Rook' &&
					pieces[leftRightShifted].numMoves == 0 &&
					nothingBetween
				) {
					let kingQueenSide = leftRightRookSearch > 0 ? '0-0' : '0-0-0';
					this.legalMoves.push({ moveIndex: leftRightShifted - leftRightRookSearch, type: kingQueenSide });
					if (leftRightRookSearch > 0) {
						castlingSpaces.absoluteRight.push({ moveIndex: this.index + leftRightRookSearch, type: '' });
						castlingSpaces.absoluteRight.push({
							moveIndex: leftRightShifted - leftRightRookSearch,
							type: kingQueenSide,
						});
					}
					if (leftRightRookSearch < 0) {
						this.legalMoves.push({
							moveIndex: leftRightShifted - 2 * leftRightRookSearch,
							type: kingQueenSide,
						});

						castlingSpaces.absoluteLeft.push({
							moveIndex: leftRightShifted - leftRightRookSearch,
							type: kingQueenSide,
						});
						castlingSpaces.absoluteLeft.push({
							moveIndex: leftRightShifted - 2 * leftRightRookSearch,
							type: kingQueenSide,
						});
						castlingSpaces.absoluteLeft.push({ moveIndex: this.index + leftRightRookSearch, type: '' });
					}
				}

				leftRightRookSearch *= -1;
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		// Tester: setPieces('rnb0kbnrp00ppppp000000000pp00000qPP00000B0N00000P00PPPPPR000KBNRm')
		// Tester: setPieces('rnb0kbnrp00p000p000000000pp0p000qPP0000PB0N00N0BP00PP000R000K00R')
		// If the king can't go to spaces between Rook and King because of checking, it cant castle
		for (let side in castlingSpaces) {
			let containsAllCastlingSide = true;
			for (let j = 0; j < castlingSpaces[side].length; j++) {
				let move = castlingSpaces[side][j];
				if (findsLegalMoves(this.legalMoves, move.moveIndex) == -1) {
					containsAllCastlingSide = false;
					break;
				}
			}
			if (!containsAllCastlingSide) {
				for (let j = 0; j < castlingSpaces[side].length; j++) {
					this.legalMoves = this.legalMoves.filter((value) => {
						let move = castlingSpaces[side][j];
						return value.moveIndex != move.moveIndex || !move.type.includes('0');
					});
				}
			}
		}

		if (showMoves) {
			this.showLegalMoves();
		}

		return this.legalMoves;
	}
}
