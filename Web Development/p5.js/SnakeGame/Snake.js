class SnakeBodyPart {
	constructor(index, isHead) {
		this.path = [index];
		this.isHead = isHead;
	}

	getCurrPos() {
		return this.path[this.path.length - 1];
	}

	getNFromEndPos(n) {
		return this.path[this.path.length - 1 - n];
	}

	draw() {
		this.x = convertIndexToCoordinate(this.getCurrPos()).x;
		this.y = convertIndexToCoordinate(this.getCurrPos()).y;
		stroke(0);
		if (this.isHead) {
			fill('#e6df85');
		} else {
			fill('#cf5348');
		}

		rect(this.x, this.y, squareSize, squareSize);
	}
}
