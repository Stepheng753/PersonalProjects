var cols, rows;
var cellSideLength = 40;
var grid = [];
var currentCell;
var stack = [];
var phase2 = false;
var endCell;

function setup() {
	createCanvas(1000, 400);
	frameRate(5);
	cols = floor(width / cellSideLength);
	rows = floor(height / cellSideLength);

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			grid.push(new Cell(j, i));
		}
	}
	currentCell = grid[0];
	endCell = grid[floor(random(1, grid.length))];
}

function draw() {
	background(51);

	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}
	if (currentCell === grid[0] && currentCell.beenVisited) {
		phase2 = true;
	}

	if (!phase2) {
		currentCell.beenVisited = true;
		currentCell.highlight();
		var nextCell = currentCell.checkNeighbors();
		if (nextCell) {
			nextCell.beenVisited = true;
			stack.push(currentCell);
			removeWalls(currentCell, nextCell);
			currentCell = nextCell;
		} else if (stack.length > 0) {
			currentCell = stack.pop();
		}
	} else {
		endCell.highlight();
		currentCell.beenVisited2 = true;
		currentCell.highlight();
		var nextCell = currentCell.checkNeighbors();
		if (nextCell) {
			nextCell.beenVisited2 = true;
			stack.push(currentCell);
			currentCell = nextCell;
			if (currentCell === endCell) {
				stack.pop().show();
				noLoop();
				stack.length = 0;
				nextCell = null;
			}
		} else if (stack.length > 0) {
			currentCell.wrongWay = true;
			currentCell = stack.pop();
		}
	}
}

function index(colNum, rowNum) {
	if (colNum < 0 || rowNum < 0 || colNum > cols - 1 || rowNum > rows - 1) {
		return -1;
	}

	return colNum + rowNum * cols;
}

function removeWalls(currentCell, nextCell) {
	var x = currentCell.colNum - nextCell.colNum;
	if (x === 1) {
		currentCell.walls[3] = false;
		nextCell.walls[1] = false;
	} else if (x === -1) {
		currentCell.walls[1] = false;
		nextCell.walls[3] = false;
	}

	var y = currentCell.rowNum - nextCell.rowNum;
	if (y === 1) {
		currentCell.walls[0] = false;
		nextCell.walls[2] = false;
	} else if (y === -1) {
		currentCell.walls[2] = false;
		nextCell.walls[0] = false;
	}
}

function setFR(num) {
	if (num === 0) {
		frameRate(0);
	} else if (num === 1) {
		frameRate(5);
	} else if (num === 2) {
		frameRate(15);
	} else if (num === 3) {
		frameRate(30);
	} else {
		frameRate(60);
	}
}

function Cell(colNum, rowNum) {
	this.colNum = colNum;
	this.rowNum = rowNum;
	this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
	this.beenVisited = false;
	this.beenVisited2 = false;
	this.wrongWay = false;

	this.show = function () {
		var x = this.colNum * cellSideLength; // finds x-coordinate  upper left corner of cell
		var y = this.rowNum * cellSideLength; // finds y-coordinate upper left corner of cell

		stroke(255);
		strokeWeight(2);
		if (this.walls[0]) {
			line(x, y, x + cellSideLength, y); // Top Wall
		}
		if (this.walls[1]) {
			line(x + cellSideLength, y, x + cellSideLength, y + cellSideLength); // Right Wall
		}

		if (this.walls[2]) {
			line(x + cellSideLength, y + cellSideLength, x, y + cellSideLength); // Bottom Wall
		}
		if (this.walls[3]) {
			line(x, y + cellSideLength, x, y); // Left Wall
		}
		if (!phase2) {
			if (this.beenVisited) {
				noStroke();
				fill(255, 0, 255, 100);
				rect(x, y, cellSideLength, cellSideLength);
			}
		} else {
			if (this.beenVisited) {
				noStroke();
				fill(255, 0, 255, 100);
				rect(x, y, cellSideLength, cellSideLength);
			}
			if (this.beenVisited2 && !this.wrongWay) {
				noStroke();
				fill(0, 100, 0);
				rect(x, y, cellSideLength, cellSideLength);
			}
		}
	};

	this.checkNeighbors = function () {
		var neighbors = [];

		var top = grid[index(colNum, rowNum - 1)];
		var right = grid[index(colNum + 1, rowNum)];
		var bottom = grid[index(colNum, rowNum + 1)];
		var left = grid[index(colNum - 1, rowNum)];
		var center = grid[index(colNum, rowNum)];

		if (!phase2) {
			if (top && !top.beenVisited) {
				neighbors.push(top);
			}
			if (right && !right.beenVisited) {
				neighbors.push(right);
			}
			if (bottom && !bottom.beenVisited) {
				neighbors.push(bottom);
			}
			if (left && !left.beenVisited) {
				neighbors.push(left);
			}

			if (neighbors.length > 0) {
				return neighbors[floor(random(0, neighbors.length))];
			} else {
				return undefined;
			}
		} else {
			if (top && !top.beenVisited2 && !center.walls[0]) {
				neighbors.push(top);
			}
			if (right && !right.beenVisited2 && !center.walls[1]) {
				neighbors.push(right);
			}
			if (bottom && !bottom.beenVisited2 && !center.walls[2]) {
				neighbors.push(bottom);
			}
			if (left && !left.beenVisited2 && !center.walls[3]) {
				neighbors.push(left);
			}

			if (neighbors.length > 0) {
				return neighbors[floor(random(0, neighbors.length))];
			} else {
				return undefined;
			}
		}
	};

	this.highlight = function () {
		var x = this.colNum * cellSideLength; // finds x-coordinate  upper left corner of cell
		var y = this.rowNum * cellSideLength; // finds y-coordinate upper left corner of cell
		noStroke();
		fill(0, 100, 200);
		rect(x + 1, y + 1, cellSideLength - 1, cellSideLength - 1);
	};
}
