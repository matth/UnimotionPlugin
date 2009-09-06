Array.prototype.each = function(callback) {
	for (var i = 0;i < this.length;i++) {
		callback(this[i], i);
	}
};

if (typeof UnimotionPlugin == 'undefined') {
	function randomNum() {
		var num = Math.random();
		if (Math.random() > 0.5) {
			num = num * -1;
		}
		return num;
	}
	var UnimotionPlugin = {
		'refreshData' : function() {},
		'readX' : randomNum,
		'readY' : randomNum,
		'readZ' : randomNum
	}
}