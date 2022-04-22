class ChessAI {
	constructor(isWhite) {
		this.isWhite = isWhite;
	}

	findBestMove(isWhiteParam, depth, piecesParam = [...pieces]) {
		let maxValue = -999_999;
		let bestMoves = [];
		for (let i = 0; i < piecesParam.length; i++) {
			if (piecesParam[i] != 0 && piecesParam[i].isWhite == isWhiteParam) {
				let legalMoves = piecesParam[i].getLegalMoves(i, false, true, piecesParam);
				for (let j = 0; j < legalMoves.length; j++) {
					let currValue = legalMoves[j].value;

					let moveFrom = piecesParam[legalMoves[j].moveFromIndex];
					let moveTo = piecesParam[legalMoves[j].moveToIndex];

					piecesParam[legalMoves[j].moveFromIndex] = 0;
					piecesParam[legalMoves[j].moveToIndex] = moveFrom;

					if (depth != 1) {
						console.log('1::', currValue);
						currValue -= this.findBestMove(!isWhiteParam, depth - 1, piecesParam);
						console.log('2::', currValue);
					}

					piecesParam[legalMoves[j].moveFromIndex] = moveFrom;
					piecesParam[legalMoves[j].moveToIndex] = moveTo;

					if (currValue > maxValue) {
						maxValue = currValue;
						bestMoves = [{ piece: piecesParam[i], move: legalMoves[j] }];
					} else if (currValue == maxValue) {
						bestMoves.push({ piece: piecesParam[i], move: legalMoves[j] });
					}
				}
			}
		}
		console.log({ isWhite: isWhiteParam, depth: depth, maxValue: maxValue, bestMoves: bestMoves });
		return maxValue;
	}
}
