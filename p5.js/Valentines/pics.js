let picsInfo;

function getRandomStartXY() {
	let xys = [];
	let x;
	let y;
	for (let i = 0; i < 12; i++) {
		x = random(0, width);
		y = 0;
		if (round(random(1))) {
			x = 0;
			y = random(0, height);
		}
		xys.push({ x, y });
	}

	return xys;
}

function setPicsInfo() {
	let xys = getRandomStartXY();
	picsInfo = [
		{ startX: xys[0].x, startY: xys[0].y, endX: 200, endY: 200, sizeX: 200, sizeY: 200 },
		{ startX: xys[1].x, startY: xys[1].y, endX: 400, endY: 200, sizeX: 200, sizeY: 200 },
		{ startX: xys[2].x, startY: xys[2].y, endX: 200, endY: 400, sizeX: 200, sizeY: 200 },
		{ startX: xys[3].x, startY: xys[3].y, endX: 400, endY: 400, sizeX: 200, sizeY: 200 },
		{ startX: xys[4].x, startY: xys[4].y, endX: 200, endY: 600, sizeX: 200, sizeY: 200 },
		{ startX: xys[5].x, startY: xys[5].y, endX: 400, endY: 600, sizeX: 200, sizeY: 200 },
		{ startX: xys[6].x, startY: xys[6].y, endX: width - 200, endY: 200, sizeX: 200, sizeY: 200 },
		{ startX: xys[7].x, startY: xys[7].y, endX: width - 400, endY: 200, sizeX: 200, sizeY: 200 },
		{ startX: xys[8].x, startY: xys[8].y, endX: width - 200, endY: 400, sizeX: 200, sizeY: 200 },
		{ startX: xys[9].x, startY: xys[9].y, endX: width - 400, endY: 400, sizeX: 200, sizeY: 200 },
		{ startX: xys[10].x, startY: xys[10].y, endX: width - 200, endY: 600, sizeX: 200, sizeY: 200 },
		{ startX: xys[11].x, startY: xys[11].y, endX: width - 400, endY: 600, sizeX: 200, sizeY: 200 },
	];
}

function drawPics() {
	for (let i = 0; i < picsInfo.length; i++) {
		let picPos = getXY(picsInfo[i].startX, picsInfo[i].startY, picsInfo[i].endX, picsInfo[i].endY);
		push();
		translate(picPos.x, picPos.y);
		imageMode(CENTER);
		image(pics[i], 0, 0, picsInfo[i].sizeX, picsInfo[i].sizeY);
		pop();
	}
}
