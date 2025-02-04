let airplaneImg;
let airplanesInfo;

function setAirplaneInfo() {
	let direction = random(0, 2 * PI);
	let startX;
	let startY;
	if (direction < PI / 2) {
		startX = random(0, width / 2 - 50);
		startY = random(height / 2, height - 50);
	} else if (direction < PI) {
		startX = random(width / 2, width - 50);
		startY = random(height / 2, height - 50);
	} else if (direction < (3 * PI) / 2) {
		startX = random(width / 2, width - 50);
		startY = random(0, height / 2 - 50);
	} else {
		startX = random(0, width / 2 - 50);
		startY = random(0, height / 2 - 50);
	}
	let speed = 7;
	let x = startX;
	let y = startY;

	return { x, y, direction, speed, startX, startY };
}

function updateAirplaneInfo(index) {
	airplanesInfo[index].x += Math.cos(airplanesInfo[index].direction) * airplanesInfo[index].speed;
	airplanesInfo[index].y -= Math.sin(airplanesInfo[index].direction) * airplanesInfo[index].speed;
}

function drawAirplane() {
	for (let i = 0; i < airplanesInfo.length; i++) {
		push();
		translate(airplanesInfo[i].x, airplanesInfo[i].y);
		imageMode(CENTER);
		rotate(PI / 4 - airplanesInfo[i].direction);
		image(airplaneImg, 0, 0, 50, 50);
		updateAirplaneInfo(i);
		pop();

		push();
		strokeWeight(2);
		drawingContext.setLineDash([20, 5]);
		stroke(0, 0, 0, 255 - (frameCount - yesButtonPressedFrameCt));
		line(airplanesInfo[i].startX, airplanesInfo[i].startY, airplanesInfo[i].x, airplanesInfo[i].y);
		pop();
	}
}

function checkAirplaneOutScreen() {
	if (airplanesInfo.length === 0) {
		return false;
	}
	for (let i = 0; i < airplanesInfo.length; i++) {
		if (
			!(
				airplanesInfo[i].x < 0 ||
				airplanesInfo[i].x > width ||
				airplanesInfo[i].y < 0 ||
				airplanesInfo[i].y > height
			)
		) {
			return false;
		}
	}
	return true;
}
