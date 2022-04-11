class AI {
	constructor(isWhite) {
		this.isWhite = isWhite;
	}

	chooseFromPiece() {
		let playersPieces = pieces.filter((piece) => piece != 0 && piece.isWhite == this.isWhite);
		let pieceIndex = playersPieces[Math.floor(Math.random() * playersPieces.length)].index;
		while (pieces[pieceIndex].getLegalMoves(false, true).length == 0) {
			pieceIndex = playersPieces[Math.floor(Math.random() * playersPieces.length)].index;
		}
		return pieceIndex;
	}

	chooseToPiece() {
		return Math.floor(Math.random() * currLegalMoves.length);
	}

	choosePromotion() {
		let x = Math.random() * 4 * squareSize + 2 * squareSize;
		let y = 4 * squareSize;
		return { x: x, y: y };
	}
}
