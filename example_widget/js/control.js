
var refreshInterval;

function refresh() {
	Seismometer.update();
}

function start() {
	refreshInterval = setInterval('refresh()', 80);
}

function stop() {
	clearInterval(refreshInterval);
}

function calibrate() {
	clearInterval(refreshInterval);
	Seismometer.calibrate();
}

calibrate();
start();
setTimeout('stop()', 2000)