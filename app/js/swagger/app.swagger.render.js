(function($,settings){
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
}(jQuery,window.app.settings));