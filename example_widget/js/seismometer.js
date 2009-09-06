var Seismometer = function() {

	var height = 200,
		width  = 320,
		txt = {font: '12px Tahoma', fill: "#BBB"},
		data = [],
		line;
		
	// Creates canvas 320 × 200 at 10, 10
	var paper = Raphael(10, 10, width, height);

	// Nice bg
	var bg = paper.rect(0, 0, width, height);
	bg.attr('fill', '#000');

	// A grid
	paper.drawGrid(30, 10, width -40, height - 20, 10, 8, "#222");
	
	// Some numbers on the side for scale
	[1,0.5,0,-0.5,-1].each(function(item, index) {
		paper.text(15, (45 * index) + 10 , item).attr(txt);
	});
		
	function drawGraph() {
		if (line != null) {
			line.remove();
		}
		line = paper.path({'stroke-width':4,stroke: "#036"}).moveTo(30, 100);
		data.each(function(item, index) {
			line.lineTo((index * 7) + 40, 100 + (90 * (-1 * item)));
		});
	}
		
	return {
		'update' : function() {
			UnimotionPlugin.refreshData();
			data.push(UnimotionPlugin.readX());
			if (data.length > 39) {
				data.shift();							
			}
			data[0] = 0;		
			drawGraph();
		},
		'calibrate' : function() {
			
		},
	}

}();
