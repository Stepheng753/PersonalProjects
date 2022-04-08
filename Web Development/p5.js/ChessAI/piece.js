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
			if (checkIfCurrentInCheck(false)) {
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

		// If pawn is on starting row, add 2 moves
		let numMovesForward = this.numMoves == 0 ? 2 : 1;
		let indexingDirection = this.getIndexingDirection();
		for (let i = 1; i <= numMovesForward; i++) {
			let possibleMoveIndex = this.index + indexingDirection * numRows * i;
			if (pieces[possibleMoveIndex] == 0) {
				let move = { moveIndex: possibleMoveIndex, type: '' };
				if (Math.floor(getRowNum(possibleMoveIndex)) == end) {
					move[1] = move[1].concat('=');
				}
				this.legalMoves.push(move);
			} else {
				break;
			}
		}

		// Check Pawn Captures
		let leftRightBounds = [
			[0, numRows - 2, 1],
			[1, numRows - 1, -1],
		];
		for (let i = 0; i < leftRightBounds.length; i++) {
			let oneIndexForward = this.index + indexingDirection * numRows;
			if (
				getColNum(oneIndexForward) >= leftRightBounds[i][0] &&
				getColNum(oneIndexForward) <= leftRightBounds[i][1]
			) {
				let oneIndexForwardRightLeft = oneIndexForward + leftRightBounds[i][2];
				if (pieces[oneIndexForwardRightLeft] != 0 && pieces[oneIndexForwardRightLeft].isWhite != this.isWhite) {
					let move = { moveIndex: oneIndexForwardRightLeft, type: 'X' };
					if (Math.floor(oneIndexForwardRightLeft / numRows) == end) {
						move.type = move.type.concat('=');
					}
					this.legalMoves.push(move);
				}
			}
		}

		// Check En Passant
		for (let i = 0; i < leftRightBounds.length; i++) {
			if (getColNum(this.index) >= leftRightBounds[i][0] && getColNum(this.index) <= leftRightBounds[i][1]) {
				let rightLeftIndex = this.index + leftRightBounds[i][2];
				let rightLeftElement = pieces[rightLeftIndex];
				if (
					rightLeftElement != 0 &&
					rightLeftElement.isWhite != this.isWhite &&
					rightLeftElement.constructor.name == 'Pawn' &&
					rightLeftElement.numMoves == 1 &&
					moves[moves.length - 1][0] == rightLeftElement
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
			[1, -1, 7],
			[1, 1, 0],
			[-1, -1, 7],
			[-1, 1, 0],
		];

		for (let i = 0; i < diag.length; i++) {
			// Index up/down row and left/right col
			let diagIndex = this.index + diag[i][1] + diag[i][0] * numRows;
			while (getColNum(diagIndex) != diag[i][2] && diagIndex >= 0 && diagIndex < pieces.length) {
				if (pieces[diagIndex] == 0) {
					this.legalMoves.push({ moveIndex: diagIndex, type: '' });
				} else if (pieces[diagIndex].isWhite != this.isWhite) {
					this.legalMoves.push({ moveIndex: diagIndex, type: 'X' });
					break;
				} else {
					break;
				}
				diagIndex += diag[i][1] + diag[i][0] * numRows;
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
			[-2, -numRows, numRows],
			[2, -numRows, numRows],
			[-1, -2 * numRows, 2 * numRows],
			[1, -2 * numRows, 2 * numRows],
		];

		for (let i = 0; i < lMoves.length; i++) {
			for (let j = 1; j <= 2; j++) {
				let lMoveIndex = this.index + lMoves[i][0] + lMoves[i][j];
				if (
					getRowNum(lMoveIndex) - getRowNum(this.index) == getRowNum(lMoves[i][j]) &&
					lMoveIndex >= 0 &&
					lMoveIndex < pieces.length
				) {
					if (pieces[lMoveIndex] == 0) {
						this.legalMoves.push({ moveIndex: lMoveIndex, type: '' });
					} else if (pieces[lMoveIndex].isWhite != this.isWhite) {
						this.legalMoves.push({ moveIndex: lMoveIndex, type: 'X' });
					}
				}
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
			[-numRows, numRows],
			[numRows, numRows],
			[-1, 7],
			[1, 0],
		];

		for (let i = 0; i < horzVert.length; i++) {
			let horzVertIndex = this.index + horzVert[i][0];
			while (getColNum(horzVertIndex) != horzVert[i][1] && horzVertIndex >= 0 && horzVertIndex < pieces.length) {
				if (pieces[horzVertIndex] == 0) {
					this.legalMoves.push({ moveIndex: horzVertIndex, type: '' });
				} else if (pieces[horzVertIndex].isWhite != this.isWhite) {
					this.legalMoves.push({ moveIndex: horzVertIndex, type: 'X' });
					break;
				} else {
					break;
				}
				horzVertIndex += horzVert[i][0];
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

		let possibleMoveIndices = [-numRows, 0, numRows];
		for (let i = 0; i < possibleMoveIndices.length; i++) {
			for (let j = -1; j <= 1; j++) {
				let borderIndex = this.index + possibleMoveIndices[i] + j;
				if (
					getRowNum(borderIndex) == getRowNum(borderIndex - j) &&
					borderIndex >= 0 &&
					borderIndex < pieces.length
				) {
					if (pieces[borderIndex] == 0) {
						this.legalMoves.push({ moveIndex: borderIndex, type: '' });
					} else if (pieces[borderIndex].isWhite != this.isWhite) {
						this.legalMoves.push({ moveIndex: borderIndex, type: 'X' });
					}
				}
			}
		}

		// Castling
		let leftRightRookSearch = [1, -1];
		let castlingSpaces = [[], []];
		if (this.numMoves == 0) {
			for (let i = 0; i < leftRightRookSearch.length; i++) {
				let j = this.index + leftRightRookSearch[i];
				let nothingBetween = true;

				while (
					(j % numRows < numRows - 1 && leftRightRookSearch[i] > 0) ||
					(j % numRows > 0 && leftRightRookSearch[i] < 0)
				) {
					if (pieces[j] != 0) {
						nothingBetween = false;
					}
					j += leftRightRookSearch[i];
				}

				if (pieces[j].constructor.name == 'Rook' && pieces[j].numMoves == 0 && nothingBetween) {
					let kingQueenSide = leftRightRookSearch[i] > 0 ? '0-0' : '0-0-0';
					this.legalMoves.push({ moveIndex: j - leftRightRookSearch[i], type: kingQueenSide });
					if (leftRightRookSearch[i] > 0) {
						castlingSpaces[0].push({ moveIndex: this.index + leftRightRookSearch[i], type: '' });
						castlingSpaces[0].push({ moveIndex: j - leftRightRookSearch[i], type: kingQueenSide });
					}
					if (leftRightRookSearch[i] < 0) {
						this.legalMoves.push({ moveIndex: j - 2 * leftRightRookSearch[i], type: kingQueenSide });

						castlingSpaces[1].push({ moveIndex: j - leftRightRookSearch[i], type: kingQueenSide });
						castlingSpaces[1].push({ moveIndex: j - 2 * leftRightRookSearch[i], type: kingQueenSide });
						castlingSpaces[1].push({ moveIndex: this.index + leftRightRookSearch[i], type: '' });
					}
				}
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		// Tester: setPieces('rnb0kbnrp00ppppp000000000pp00000qPP00000B0N00000P00PPPPPR000KBNRm')
		// Tester: setPieces('rnb0kbnrp00p000p000000000pp0p000qPP0000PB0N00N0BP00PP000R000K00R')
		// Tester: setPieces('rnb0kbr0p00pn00p000000000pp0p000qPPPP00PB0N00N0BP0000000R000K00R')
		// If the king can't go to spaces between Rook and King because of checking, it cant castle
		for (let i = 0; i < castlingSpaces.length; i++) {
			let containsAllCastlingSide = true;
			for (let j = 0; j < castlingSpaces[i].length; j++) {
				if (findsLegalMoves(this.legalMoves, castlingSpaces[i][j][0]) == -1) {
					containsAllCastlingSide = false;
					break;
				}
			}
			if (!containsAllCastlingSide) {
				for (let j = 0; j < castlingSpaces[i].length; j++) {
					this.legalMoves = this.legalMoves.filter((value) => {
						return value[0] != castlingSpaces[i][j][0] || !castlingSpaces[i][j][1].includes('0');
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
