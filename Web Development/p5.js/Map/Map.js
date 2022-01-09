let subscriberData;
let countries;
let trainMap;
let canvas;
let data = [];

const mappa = new Mappa('Leaflet');
const options = {
	lat: 0,
	lng: 0,
	zoom: 2.5,
	style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
};

function preload() {
	subscriberData = loadTable('subscribers_geo.csv', 'header');
	countries = loadJSON('countries.json');
}

function setup() {
	canvas = createCanvas(1000, 1000);
	trainMap = mappa.tileMap(options);
	trainMap.overlay(canvas);

	let maxSubs = 0;
	let minSubs = Infinity;

	for (let row of subscriberData.rows) {
		let country = row.get('country_id').toLowerCase();
		let latlon = countries[country];
		if (latlon) {
			let lat = latlon[0];
			let lon = latlon[1];
			let subCount = Number(row.get('subscribers'));
			data.push({ lat, lon, subCount });
			if (subCount > maxSubs) {
				maxSubs = subCount;
			}
			if (subCount < minSubs) {
				minSubs = subCount;
			}
		}
	}

	let minDiameter = sqrt(minSubs);
	let maxDiamter = sqrt(maxSubs);

	for (let country of data) {
		country.diameter = map(sqrt(country.subCount), minDiameter, maxDiamter, 1, 20);
	}
}

function draw() {
	clear();

	for (let country of data) {
		const pixCoord = trainMap.latLngToPixel(country.lat, country.lon);

		fill(frameCount % 255, 0, 200, 100);
		const scl = pow(2, trainMap.zoom()); // * sin(frameCount * 0.1);
		ellipse(pixCoord.x, pixCoord.y, country.diameter * scl);
	}
}
