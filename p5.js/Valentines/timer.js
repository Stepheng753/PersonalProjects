const arrivalVN = new Date('February 14, 2025 22:00:00 GMT+07:00');
let countdownStartPanFrameCt;
let pics = [];

function countDown() {
	let timeNow = new Date();
	const timeLeft = arrivalVN - timeNow;
	const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	return { days, hours, minutes, seconds };
}

function drawCountDown() {
	if (frameCount - yesButtonPressedFrameCt == 255) {
		countdownStartPanFrameCt = frameCount;
	}
	if (frameCount - yesButtonPressedFrameCt >= 255) {
		noButton.remove();
		yesButton.remove();

		const { days, hours, minutes, seconds } = countDown();
		textAlign(CENTER);
		textStyle(BOLD);
		textSize(50);
		fill('#e6695e');
		stroke(0);
		strokeWeight(2);

		drawPics();

		let countdownPos = getXY(-200, 600, width / 2, 600);
		text(`${days}d ${hours}h ${minutes}m ${seconds}s`, countdownPos.x, countdownPos.y);
		let seeYouPos = getXY(width / 2, height, width / 2, 400);
		text('See you Em Iu\nIn ...', seeYouPos.x, seeYouPos.y);
	}
}

function calculateDirection(startX, startY, endX, endY) {
	let xDir = endX - startX;
	let yDir = -(endY - startY);
	return Math.atan2(yDir, xDir);
}

function getXY(startX, startY, endX, endY, timeDur = 200) {
	let dir = calculateDirection(startX, startY, endX, endY);
	let posX = startX + ((endX - startX) / timeDur) * (frameCount - countdownStartPanFrameCt);
	let posY = startY + ((endY - startY) / timeDur) * (frameCount - countdownStartPanFrameCt);
	if (Math.sign(Math.cos(dir)) * (endX - posX) <= 0) {
		posX = endX;
	}
	if (-Math.sign(Math.sin(dir)) * (endY - posY) <= 0) {
		posY = endY;
	}
	return { x: posX, y: posY, dir: dir };
}
