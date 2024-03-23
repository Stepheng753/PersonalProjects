function init() {
	var h1tags = document.getElementsByTagName('h1');
	for (var i = 0; i < h1tags.length; i++) {
		h1tags[i].onclick = changeColor;
	}

	var canvas = document.getElementById('canvas');
	drawings(canvas);

	if (navigator.geolocation) {
		document.getElementById('notify').innerHTML = 'We are Trying to Find You';
		navigator.geolocation.getCurrentPosition(successFunc, errorFunc);
	} else {
		document.getElementById('notify').innerHTML = 'No Support for GeoLocation';
	}
}

function changeColor() {
	// this.innerHTML = "Click to Change Color";
	var randomcolor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	this.style.color = randomcolor;
}

function toggleImg(imgNum) {
	var imgVar;
	var imgArr = ['Charmander', 'Squirtle', 'Bulbasaur', 'CharmanderEvolve', 'SquirtleEvolve', 'BulbasaurEvolve'];
	for (var i = 0; i < imgArr.length; i++) {
		if (imgNum == i) {
			imgVar = imgArr[i];
		}
	}

	var img = document.getElementById(imgVar);
	var isImgVisible = img.style.visibility == 'hidden';
	img.style.visibility = isImgVisible ? 'visible' : 'hidden';
}

function drawings(canvas) {
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		ctx.fillStyle = '#FAEBD7';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = '#AF002A';
		ctx.fillRect(100, 100, 50, 50);

		ctx.lineWidth = 5;
		ctx.strokeStyle = '#A4C639';
		ctx.strokeRect(100, 100, 50, 50);

		ctx.fillStyle = '#00308F';
		ctx.beginPath();
		ctx.arc(200, 200, 50, 0, Math.PI * 2, true);
		ctx.fill();

		ctx.fillStyle = '#3B444B';
		ctx.beginPath();
		ctx.moveTo(350, 200);
		ctx.lineTo(400, 50);
		ctx.lineTo(450, 200);
		ctx.closePath();
		ctx.fill();

		ctx.strokeStyle = '#A4C639';
		ctx.beginPath();
		ctx.moveTo(350, 200);
		ctx.lineTo(400, 50);
		ctx.lineTo(450, 200);
		ctx.closePath();
		ctx.stroke();

		var linGrad = ctx.createLinearGradient(400, 100, 500, 500);

		linGrad.addColorStop(0, '#8DB600');
		linGrad.addColorStop(0.5, '#9966CC');
		linGrad.addColorStop(1, '#7C0A02');

		ctx.fillStyle = linGrad;
		ctx.fillRect(550, 150, 100, 100);

		ctx.fillStyle = 'rgba(200,128,255,1)';
		ctx.fillRect(500, 100, 100, 100);

		var radGrad = ctx.createRadialGradient(275, 250, 5, 290, 260, 100);
		ctx.beginPath();
		radGrad.addColorStop(0, 'red');
		radGrad.addColorStop(1, 'white');
		ctx.fillStyle = radGrad;
		ctx.arc(250, 250, 50, 0, Math.PI * 2, true);
		ctx.fill();

		ctx.font = 'bold 40px Times New Roman';
		ctx.fillStyle = 'blue';
		ctx.fillText('Hello', 100, 50);

		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 1;
		ctx.strokeText('Hello', 100, 50);

		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 3;
		ctx.shadowColor = 'black';
		ctx.fillText('Hello', 100, 50);

		ctx.lineWidth = 5;
		ctx.strokeStyle = 'purple';
		ctx.beginPath();
		ctx.moveTo(200, 400);
		ctx.lineCap = 'square';
		ctx.lineTo(200, 500);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(270, 500, 50, 0, Math.PI, true);
		ctx.stroke();

		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(350, 500);
		ctx.quadraticCurveTo(550, 450, 600, 400);
		ctx.stroke();

		ctx.strokeStyle = 'blue';
		ctx.beginPath();
		ctx.moveTo(600, 400);
		ctx.bezierCurveTo(650, 300, 680, 500, 700, 400);
		ctx.stroke();

		ctx.fillStyle = '#FF9966';
		ctx.fillRect(200, 200, 100, 100);

		ctx.rotate(Math.PI / 4);
		ctx.scale(0.5, 1);
		ctx.fillRect(400, 50, 100, 100);
	}
}

function successFunc(pos) {
	var lat = pos.coords.latitude;
	var lon = pos.coords.longitude;
	document.getElementById('notify').innerHTML = 'Location: (' + lat + ', ' + lon + ')';
}

function errorFunc(pos) {
	document.getElementById('notify').innerHTML = 'No Support for GeoLocation';
}

function setName() {
	var userName = document.getElementById('yourName').value;
	if (userName === '') {
		return false;
	}
	localStorage.setItem('name', userName);

	document.getElementById('yourName').value = 'Name Saved';
}

function getName() {
	if (localStorage.getItem('name') === null) {
		return false;
	}
	document.getElementById('yourName').value = 'Name Stored: ' + localStorage.getItem('name');
}

function removeName() {
	if (localStorage.getItem('name') === null) {
		return false;
	}
	localStorage.removeItem('name');
	document.getElementById('yourName').value = 'Name removed';
}

onload = init;
