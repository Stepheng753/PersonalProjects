function preload() {
	img = loadImage('Assets/ChessPieces.png');
}

class Piece {
	constructor(index, isWhite, numPic) {
		this.index = index;
		this.isWhite = isWhite;
		let y = this.isWhite ? 0 : img.height / 2;

		this.piecePic = img.get((numPic * img.width) / 6, y, img.width / 6, img.width / 6);
		this.piecePic.resize(canvasSize / numRows, canvasSize / numRows);
	}

	drawPiece() {
		let x = (this.index % numRows) * (canvasSize / numRows);
		let y = Math.floor(this.index / numRows) * (canvasSize / numCols);
		image(this.piecePic, x, y);
	}
}

class Pawn extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 5);
	}

	showLegalMoves() {
		initSquares();
		squares[this.index] = '#e9eba2';
		let legalMoves = [];

		let numMovesForward =
			Math.floor(this.index / numRows) == 1 || Math.floor(this.index / numRows) == numRows - 2 ? 2 : 1;
		let indexingDirection = this.isWhite ? -1 : 1;
		for (let i = 1; i <= numMovesForward; i++) {
			let possibleMoveIndex = this.index + indexingDirection * numRows * i;
			if (board[possibleMoveIndex] == 0) {
				legalMoves.push(possibleMoveIndex);
			} else {
				break;
			}
		}

		let oneIndexForward = this.index + indexingDirection * numRows;
		if (
			oneIndexForward % numRows == 0 ||
			(oneIndexForward % numRows >= 1 && oneIndexForward % numRows <= numRows - 2)
		) {
			let oneIndexForwardRight = oneIndexForward + 1;
			if (board[oneIndexForwardRight] != 0 && board[oneIndexForwardRight].isWhite != this.isWhite) {
				legalMoves.push(oneIndexForwardRight);
			}
		}
		if (
			oneIndexForward % numRows == numRows - 1 ||
			(oneIndexForward % numRows >= 1 && oneIndexForward % numRows <= numRows - 2)
		) {
			let oneIndexForwardLeft = oneIndexForward - 1;
			if (board[oneIndexForwardLeft] != 0 && board[oneIndexForwardLeft].isWhite != this.isWhite) {
				legalMoves.push(oneIndexForwardLeft);
			}
		}

		for (let i = 0; i < legalMoves.length; i++) {
			squares[legalMoves[i]] = '#59b381';
		}
		return legalMoves;
	}
}

class Bishop extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 2);
	}

	showLegalMoves() {
		initSquares();
		squares[this.index] = '#e9eba2';
		let legalMoves = [];

		let diag = [
			[1, -1, 7],
			[1, 1, 0],
			[-1, -1, 7],
			[-1, 1, 0],
		];

		for (let i = 0; i < diag.length; i++) {
			let diagIndex = this.index + diag[i][0] * numRows + diag[i][1];
			while (diagIndex % numRows != diag[i][2] && diagIndex >= 0 && diagIndex < board.length) {
				if (board[diagIndex] == 0) {
					legalMoves.push(diagIndex);
				} else if (board[diagIndex].isWhite != this.isWhite) {
					legalMoves.push(diagIndex);
					break;
				} else {
					break;
				}
				diagIndex += diag[i][0] * numRows + diag[i][1];
			}
		}

		for (let i = 0; i < legalMoves.length; i++) {
			squares[legalMoves[i]] = '#59b381';
		}
		return legalMoves;
	}
}

class Knight extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 3);
	}

	showLegalMoves() {
		initSquares();
		squares[this.index] = '#e9eba2';
		let legalMoves = [];

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
					lMoveIndex < board.length
				) {
					if (board[lMoveIndex] == 0) {
						legalMoves.push(lMoveIndex);
					} else if (board[lMoveIndex].isWhite != this.isWhite) {
						legalMoves.push(lMoveIndex);
					}
				}
			}
		}

		for (let i = 0; i < legalMoves.length; i++) {
			squares[legalMoves[i]] = '#59b381';
		}
		return legalMoves;
	}
}

class Rook extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 4);
	}

	showLegalMoves() {
		initSquares();
		squares[this.index] = '#e9eba2';
		let legalMoves = [];

		let horzVert = [
			[-numRows, numRows],
			[numRows, numRows],
			[-1, 7],
			[1, 0],
		];

		for (let i = 0; i < horzVert.length; i++) {
			let horzVertIndex = this.index + horzVert[i][0];
			while (horzVertIndex % numRows != horzVert[i][1] && horzVertIndex >= 0 && horzVertIndex < board.length) {
				if (board[horzVertIndex] == 0) {
					legalMoves.push(horzVertIndex);
				} else if (board[horzVertIndex].isWhite != this.isWhite) {
					legalMoves.push(horzVertIndex);
					break;
				} else {
					break;
				}
				horzVertIndex += horzVert[i][0];
			}
		}

		for (let i = 0; i < legalMoves.length; i++) {
			squares[legalMoves[i]] = '#59b381';
		}
		return legalMoves;
	}
}

class Queen extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 1);
	}

	showLegalMoves() {
		initSquares();
		squares[this.index] = '#e9eba2';
		let legalMoves = [];

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
			while (diagIndex % numRows != diag[i][2] && diagIndex >= 0 && diagIndex < board.length) {
				if (board[diagIndex] == 0) {
					legalMoves.push(diagIndex);
				} else if (board[diagIndex].isWhite != this.isWhite) {
					legalMoves.push(diagIndex);
					break;
				} else {
					break;
				}
				diagIndex += diag[i][0] * numRows + diag[i][1];
			}
		}

		for (let i = 0; i < horzVert.length; i++) {
			let horzVertIndex = this.index + horzVert[i][0];
			while (horzVertIndex % numRows != horzVert[i][1] && horzVertIndex >= 0 && horzVertIndex < board.length) {
				if (board[horzVertIndex] == 0) {
					legalMoves.push(horzVertIndex);
				} else if (board[horzVertIndex].isWhite != this.isWhite) {
					legalMoves.push(horzVertIndex);
					break;
				} else {
					break;
				}
				horzVertIndex += horzVert[i][0];
			}
		}

		for (let i = 0; i < legalMoves.length; i++) {
			squares[legalMoves[i]] = '#59b381';
		}
		return legalMoves;
	}
}

class King extends Piece {
	constructor(index, isWhite) {
		super(index, isWhite, 0);
	}

	showLegalMoves() {
		initSquares();
		squares[this.index] = '#e9eba2';
		let legalMoves = [];

		let possibleMoveIndices = [-numRows, 0, numRows];
		for (let i = 0; i < possibleMoveIndices.length; i++) {
			for (let j = -1; j <= 1; j++) {
				let borderIndex = this.index + possibleMoveIndices[i] + j;
				if (
					Math.floor(borderIndex / numRows) == Math.floor((borderIndex - j) / numRows) &&
					borderIndex >= 0 &&
					borderIndex < board.length
				) {
					if (board[borderIndex] == 0) {
						legalMoves.push(borderIndex);
					} else if (board[borderIndex].isWhite != this.isWhite) {
						legalMoves.push(borderIndex);
						break;
					}
				}
			}
		}

		for (let i = 0; i < legalMoves.length; i++) {
			squares[legalMoves[i]] = '#59b381';
		}
		return legalMoves;
	}
}
