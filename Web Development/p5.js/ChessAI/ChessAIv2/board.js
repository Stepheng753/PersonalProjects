class Board {
	constructor() {
		pieces = new Array(64);
		squares = new Array(64);
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
		for (let i = 8; i < 16; i++) pieces[i] = new Pawn(false);
		for (let i = 48; i < 56; i++) pieces[i] = new Pawn(true);
	}

	initBishops() {
		pieces[2] = new Bishop(false);
		pieces[5] = new Bishop(false);
		pieces[58] = new Bishop(true);
		pieces[61] = new Bishop(true);
	}

	initKnights() {
		pieces[1] = new Knight(false);
		pieces[6] = new Knight(false);
		pieces[57] = new Knight(true);
		pieces[62] = new Knight(true);
	}

	initRooks() {
		pieces[0] = new Rook(false);
		pieces[7] = new Rook(false);
		pieces[56] = new Rook(true);
		pieces[63] = new Rook(true);
	}

	initQueens() {
		pieces[3] = new Queen(false);
		pieces[59] = new Queen(true);
	}

	initKings() {
		pieces[4] = new King(false);
		pieces[60] = new King(true);
	}

	initEmptySpace() {
		for (let i = 0; i < pieces.length; i++) {
			if (!pieces[i]) {
				pieces[i] = 0;
			}
		}
	}

	initSquares() {
		for (let i = 0; i < pieces.length; i++) {
			if ((i % 2 == 1 && Math.floor(i / numRows) % 2 == 0) || (i % 2 == 0 && Math.floor(i / numRows) % 2 == 1)) {
				squares[i] = defaultSquareColor;
			} else {
				squares[i] = 255;
			}
		}
	}
}
