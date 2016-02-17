var app = app;

(function($, cirts, document, swagger,settings){
	'use strict';
	var util = app.swaggerUtils;



	$(function () {
		var output = $('#result');
		$('#send').submit(function (event) {
			cirts.init(
				$('#apiid').val(),
				$('#apikey').val(),
				$('#username').val(),
				$('#password').val()
			);
			output.html('Sending...');
			cirts.get($('#endpoint-selector').val()+$('#resource').val(),
				function (result) {
					output.html(JSON.stringify(result, null, 4));
					window.app.swaggerUtils.validateResponse(result);
				},
				function (response) {
					var txt = response.statusText + ' (' + response.status + ')\n';
					if (response.responseJSON && response.responseJSON.message) {
						txt += '\n\n' + response.responseJSON.message;
					}
					if (response.responseJSON && response.responseJSON.exceptionMessage) {
						txt += '\n' + response.responseJSON.exceptionMessage;
					}


					if (response.responseJSON && response.responseJSON.exceptionType) {
						txt += '\n Technical Details:';
						txt += '\n\n\n\n' + response.responseJSON.exceptionType;
					}
					if (response.responseJSON && response.responseJSON.stackTrace) {
						txt += '\n' + response.responseJSON.stackTrace;
					}
					output.html(txt);


				},
				$("#resource").val()
			);
			event.preventDefault();
		});
	});


}($ || ($ = jQuery), window.app.cirts, window.document, window.app.swaggerSpec, window.app.cirtsSettings)); //jshint ignore:line
