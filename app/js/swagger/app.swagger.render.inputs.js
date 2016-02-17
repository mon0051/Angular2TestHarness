(function (util) {
	'use strict';
	var input = util.input;
	var gen = window.app.swaggerGen = {};
	var paths = util.paths;
	var getSelectInput = function (value, text) {
		return "<option value='" + value + "'>" + text + "</option>";
	};

	gen.generateInput = function () {
		input().append("<select class='nope' id='endpoint-selector'></select>");
		var endpointSelector = function () {
			return $("#endpoint-selector");
		};

		for (var path in paths) {
			if (paths.hasOwnProperty(path)) {
				endpointSelector().append(getSelectInput(path.substring(1,path.length),path));
			}
		}
	};

	gen.generateInput();

}(window.app.swagger || (window.app.swagger = {})));