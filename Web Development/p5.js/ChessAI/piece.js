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
		this.piecePic.resize(canvasSize / numRows, canvasSize / numRows);
	}

	drawPiece() {
		let x = (this.index % numRows) * (canvasSize / numRows);
		let y = Math.floor(this.index / numRows) * (canvasSize / numCols);
		image(this.piecePic, x, y);
	}

	filterCheck() {
		let i = 0;
		while (i < this.legalMoves.length) {
			let currMove = this.legalMoves[i];
			let ogTemp = pieces[this.index];
			let newTemp = pieces[currMove[0]];

			pieces[this.index] = 0;
			pieces[this.legalMoves[i][0]] = ogTemp;

			if (checkForCheck(false)) {
				this.legalMoves = this.legalMoves.filter((value) => {
					return value != currMove;
				});
				i--;
			}

			pieces[this.index] = ogTemp;
			pieces[currMove[0]] = newTemp;
			i++;
		}
	}
}

class Pawn extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 5);
	}

	getLegalMoves(showMoves, doCheck = false) {
		this.legalMoves = [];

		let numMovesForward =
			Math.floor(this.index / numRows) == 1 || Math.floor(this.index / numRows) == numRows - 2 ? 2 : 1;
		let indexingDirection = this.isWhite ? -1 : 1;
		for (let i = 1; i <= numMovesForward; i++) {
			let possibleMoveIndex = this.index + indexingDirection * numRows * i;
			if (pieces[possibleMoveIndex] == 0) {
				this.legalMoves.push([possibleMoveIndex, '']);
			} else {
				break;
			}
		}

		let oneIndexForward = this.index + indexingDirection * numRows;
		if (oneIndexForward % numRows >= 0 && oneIndexForward % numRows <= numRows - 2) {
			let oneIndexForwardRight = oneIndexForward + 1;
			if (pieces[oneIndexForwardRight] != 0 && pieces[oneIndexForwardRight].isWhite != this.isWhite) {
				this.legalMoves.push([oneIndexForwardRight, 'x']);
			}
		}
		if (
			oneIndexForward % numRows == numRows - 1 ||
			(oneIndexForward % numRows >= 1 && oneIndexForward % numRows <= numRows - 2)
		) {
			let oneIndexForwardLeft = oneIndexForward - 1;
			if (pieces[oneIndexForwardLeft] != 0 && pieces[oneIndexForwardLeft].isWhite != this.isWhite) {
				this.legalMoves.push([oneIndexForwardLeft, 'x']);
			}
		}

		let leftRightBounds = [
			[0, numRows - 2, 1],
			[1, numRows - 1, -1],
		];
		for (let i = 0; i < leftRightBounds.length; i++) {
			if (this.index % numRows >= leftRightBounds[i][0] && this.index % numRows <= leftRightBounds[i][1]) {
				let rightIndex = this.index + leftRightBounds[i][2];
				let rightElement = pieces[rightIndex];
				if (
					rightElement != 0 &&
					rightElement.isWhite != this.isWhite &&
					rightElement.numMoves == 1 &&
					moves[moves.length - 1][0] == rightElement
				) {
					this.legalMoves.push([rightIndex + indexingDirection * numRows, 'e.p.']);
				}
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			for (let i = 0; i < this.legalMoves.length; i++) {
				squares[this.legalMoves[i][0]] = '#59b381';
			}
		}
		return this.legalMoves;
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
			let diagIndex = this.index + diag[i][0] * numRows + diag[i][1];
			while (diagIndex % numRows != diag[i][2] && diagIndex >= 0 && diagIndex < pieces.length) {
				if (pieces[diagIndex] == 0) {
					this.legalMoves.push([diagIndex, '']);
				} else if (pieces[diagIndex].isWhite != this.isWhite) {
					this.legalMoves.push([diagIndex, 'x']);
					break;
				} else {
					break;
				}
				diagIndex += diag[i][0] * numRows + diag[i][1];
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			for (let i = 0; i < this.legalMoves.length; i++) {
				squares[this.legalMoves[i][0]] = '#59b381';
			}
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
					Math.floor(lMoveIndex / numRows) - Math.floor(this.index / numRows) ==
						Math.floor(lMoves[i][j] / numRows) &&
					lMoveIndex >= 0 &&
					lMoveIndex < pieces.length
				) {
					if (pieces[lMoveIndex] == 0) {
						this.legalMoves.push([lMoveIndex, '']);
					} else if (pieces[lMoveIndex].isWhite != this.isWhite) {
						this.legalMoves.push([lMoveIndex, 'x']);
					}
				}
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			for (let i = 0; i < this.legalMoves.length; i++) {
				squares[this.legalMoves[i][0]] = '#59b381';
			}
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
			while (horzVertIndex % numRows != horzVert[i][1] && horzVertIndex >= 0 && horzVertIndex < pieces.length) {
				if (pieces[horzVertIndex] == 0) {
					this.legalMoves.push([horzVertIndex, '']);
				} else if (pieces[horzVertIndex].isWhite != this.isWhite) {
					this.legalMoves.push([horzVertIndex, 'x']);
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
			for (let i = 0; i < this.legalMoves.length; i++) {
				squares[this.legalMoves[i][0]] = '#59b381';
			}
		}
		return this.legalMoves;
	}
}

class Queen extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 1);
	}

	getLegalMoves(showMoves, doCheck = false) {
		this.legalMoves = [];

		let diag = [
			[1, -1, 7],
			[1, 1, 0],
			[-1, -1, 7],
			[-1, 1, 0],
		];

		let horzVert = [
			[-numRows, numRows],
			[numRows, numRows],
			[-1, 7],
			[1, 0],
		];

		for (let i = 0; i < diag.length; i++) {
			let diagIndex = this.index + diag[i][0] * numRows + diag[i][1];
			while (diagIndex % numRows != diag[i][2] && diagIndex >= 0 && diagIndex < pieces.length) {
				if (pieces[diagIndex] == 0) {
					this.legalMoves.push([diagIndex, '']);
				} else if (pieces[diagIndex].isWhite != this.isWhite) {
					this.legalMoves.push([diagIndex, 'x']);
					break;
				} else {
					break;
				}
				diagIndex += diag[i][0] * numRows + diag[i][1];
			}
		}

		for (let i = 0; i < horzVert.length; i++) {
			let horzVertIndex = this.index + horzVert[i][0];
			while (horzVertIndex % numRows != horzVert[i][1] && horzVertIndex >= 0 && horzVertIndex < pieces.length) {
				if (pieces[horzVertIndex] == 0) {
					this.legalMoves.push([horzVertIndex, '']);
				} else if (pieces[horzVertIndex].isWhite != this.isWhite) {
					this.legalMoves.push([horzVertIndex, 'x']);
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
			for (let i = 0; i < this.legalMoves.length; i++) {
				squares[this.legalMoves[i][0]] = '#59b381';
			}
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
					Math.floor(borderIndex / numRows) == Math.floor((borderIndex - j) / numRows) &&
					borderIndex >= 0 &&
					borderIndex < pieces.length
				) {
					if (pieces[borderIndex] == 0) {
						this.legalMoves.push([borderIndex, '']);
					} else if (pieces[borderIndex].isWhite != this.isWhite) {
						this.legalMoves.push([borderIndex, 'x']);
					}
				}
			}
		}

		let leftRightRookSearch = [1, -1];

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
					this.legalMoves.push([j - leftRightRookSearch[i], kingQueenSide]);
					if (leftRightRookSearch[i] < 0) {
						this.legalMoves.push([j - 2 * leftRightRookSearch[i], kingQueenSide]);
					}
				}
			}
		}

		if (doCheck) {
			this.filterCheck();
		}

		if (showMoves) {
			for (let i = 0; i < this.legalMoves.length; i++) {
				squares[this.legalMoves[i][0]] = '#59b381';
			}
		}
		return this.legalMoves;
	}
}
