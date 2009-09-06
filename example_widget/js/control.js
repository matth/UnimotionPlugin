
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

start();