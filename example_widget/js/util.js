// Too much ruby
Array.prototype.each = function(callback) {
	for (var i = 0;i < this.length;i++) {
		callback(this[i], i);
	}
};

// For browser testing, where UnimotionPlugin doesn't exist
if (typeof widget == 'undefined') {

	var UnimotionPlugin = function() {
		function randomNum() {
			var num = Math.random();
			if (Math.random() > 0.5) {
				num = num * -1;
			}
			return num;
		}

		return {
			'refreshData' : function() {},
			'readX' : randomNum,
			'readY' : randomNum,
			'readZ' : randomNum
		}

	}();
	
}
