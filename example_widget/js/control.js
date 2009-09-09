(function() {

	var front = document.getElementById("front"),
 		back  = document.getElementById("back"),
		refreshInterval,
		gDoneButton = new AppleGlassButton(document.getElementById("doneButton"), "Done", hideBack),
		gInfoButton = new AppleInfoButton(document.getElementById("infoButton"),front, "black", "black", showBack);

	document.getElementById('axis').onchange = function() {
		Seismometer.changeAxis(document.getElementById('axis').value);
	}

	function showBack() {
		
		if (window.widget) {
			widget.prepareForTransition("ToBack");
			setTimeout('widget.performTransition();', 1)
		}
		
		front.style.display="none";
		back.style.display="block";
	}
	
	function hideBack() {
		
		if (window.widget) {
			widget.prepareForTransition("ToFront");
			setTimeout('widget.performTransition();', 1);
		}
		
		back.style.display="none";
		front.style.display="block";		
		
	}

	function start() {
		clearInterval(refreshInterval);
		refreshInterval = setInterval('Seismometer.update();', 80);
	}

	function stop() {
		Seismometer.reset();
		clearInterval(refreshInterval);
	}

	if (UnimotionPlugin.detectSms() != 0) {
		if (typeof widget != 'undefined') {
			widget.onhide = stop;
			widget.onshow = start;
		} 
		start();
	} else {
		document.getElementById('error').style.display = "block";
	}

})();
