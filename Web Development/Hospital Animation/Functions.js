window.onload = function () {
	pausePlay();
	dayToNight();
	makeStars();
};

function pausePlay() {
	const audio = document.getElementById('audio');
	document.body.onkeypress = function (e) {
		console.log(e.key);
		if (e.key == ' ' && !audio.paused) {
			audio.pause();
		} else if (e.key == ' ' && audio.paused) {
			audio.play();
		}
	};
}

function dayToNight() {
	const sunMoon = document.querySelector('.sun-moon');
	const body = document.querySelector('body');
	sunMoon.onclick = function () {
		body.classList.toggle('night');
	};
}

function makeStars() {
	const numStars = Math.floor(Math.random() * 400);
	for (let i = 0; i < numStars; i++) {
		let randomLeft = Math.floor(Math.random() * 100);
		let randomTop = Math.floor(Math.random() * 85);

		let div1 = document.createElement('div');
		div1.innerHTML = '*';
		div1.className = 'stars';
		div1.style = 'left: ' + randomLeft + '%' + '; top: ' + randomTop + '%;';
		document.getElementById('scene').appendChild(div1);

		let div2 = document.createElement('div');
		div2.innerHTML = '*';
		div2.className = 'stars';
		div2.style = 'left: ' + (-100 + randomLeft) + '%' + '; top: ' + randomTop + '%;';
		document.getElementById('scene').appendChild(div2);
	}
}
