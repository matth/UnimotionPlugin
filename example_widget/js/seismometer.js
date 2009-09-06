var Seismometer = function() {

	var height = 180,
		width  = 260,
		data = [0],
		line;
		
	var canvas = document.getElementById("canvas");
	
 	var ctx = canvas.getContext("2d");

	function setup() {
		
		// Clear
		ctx.clearRect(0,0,width,height);
		
		// Nice bg
		ctx.fillStyle = "rgb(0,0,0)";
	 	ctx.fillRect(0, 0, width, height);

		// A grid	
		function drawGrid(x, y, w, h, columns, rows, color) {
			ctx.lineWidth = 1;	
			ctx.strokeStyle = color;
			ctx.strokeRect(x,y,w,h);
		
			var colWidth  = Math.round(w / columns),
				rowHeight = Math.round(h / rows);
		
			// Do columns
			for (var i=0;i<columns;i++) {
				ctx.beginPath();
				ctx.moveTo(x + (colWidth * i), y);
				ctx.lineTo(x + (colWidth * i), y + h);
				ctx.closePath();		
				ctx.stroke();			
			}

			// Do rows
			for (var i=0;i<rows;i++) {
				ctx.beginPath();
				ctx.moveTo(x, y + (rowHeight * i));
				ctx.lineTo(x + w, y + (rowHeight * i));
				ctx.closePath();		
				ctx.stroke();			
			}		
					
		}
	
		drawGrid(0, 0, width, height, 10, 8, "rgb(34,34,34)");

	}
	
	function drawGraph() {
		setup();
		ctx.strokeStyle = "#036";
		ctx.lineWidth =  4;
		ctx.beginPath();
		ctx.moveTo(-20, 100);		
		data.each(function(item, index) {
			ctx.lineTo((index * 7) + 14, 90 + (80 * (-1 * item)));
		});
		ctx.stroke();
	}
	
	return {
		'update' : function() {
			UnimotionPlugin.refreshData();
			data.push(UnimotionPlugin.readY().toFixed(1));
			if (data.length > 36) {
				data.shift();							
			}
			drawGraph();
		},
		'calibrate' : function() {
			
		},
	}

}();
