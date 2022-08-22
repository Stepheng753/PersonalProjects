function convertIndexToCoordinate(index) {
	let x = (index % length) * squareSize;
	let y = parseInt(index / length) * squareSize;
	return { x: x, y: y };
}

class Square {
	constructor(index) {
		this.index = index;
		this.x = convertIndexToCoordinate(index).x;
		this.y = convertIndexToCoordinate(index).y;
		this.primary = this.isPrimary();
	}

	isPrimary() {
		let row = parseInt(this.index / length);
		let col = this.index % length;

		return (row % 2 == 0 && col % 2 == 0) || (row % 2 != 0 && col % 2 != 0);
	}

	draw() {
		stroke(0);
		if (this.primary) {
			fill('#02b1c4');
		} else {
			fill('#017a87');
		}
		rect(this.x, this.y, squareSize, squareSize);
	}
}
