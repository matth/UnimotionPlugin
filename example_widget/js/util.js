Array.prototype.each = function(callback) {
	for (var i = 0;i < this.length;i++) {
		callback(this[i], i);
	}
};

if (typeof UnimotionPlugin == 'undefined') {
	var UnimotionPlugin = {
		'refreshData' : function() {},
		'readX' : function() {
			var num = Math.random().toFixed(2);
			if (Math.random() > 0.5) {
				num = num * -1;
			}
			return num;
		}
	}
}

// Only numeric and inclusive for now
function Range(range) {

	var matches = range.match(/^(\d+)(\.+)(\d+)$/)
		start	= parseInt(matches[1]),
		end		= parseInt(matches[3]),
		arr		= [];
	
	while(start <= end) {
		arr.push(start);
		start++;
	}
		
	return arr;
}

