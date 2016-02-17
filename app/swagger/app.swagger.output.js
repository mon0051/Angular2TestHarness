(function ($, app) {
	var settings = app.settings || (app.settings = {});

	app.swagger.output = ng.core.Component({
		selector: 'swagger-output',
		templateUrl: 'app/swagger/swagger-output.html'
	}).Class({
		constructor: function SwaggerOutput() {
			
		}
	});

	$(document).ready(function () {
		var apiEndpoints = function () {
			var output = "";

			for (var pathTemplate in window.app.swagger.spec.paths) {
				if (window.app.swagger.spec.paths.hasOwnProperty(pathTemplate)) {
					output += pathTemplate + "<br>";
				}
			}
			return output;
		};

		$('#swagger-output').html(apiEndpoints());
		$('#password').val(settings.password);
		$('#username').val(settings.fullUserName());
	});
}(jQuery, window.app || (window.app = {})));
