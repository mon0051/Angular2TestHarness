(function(app){
	'use strict';

	function SwaggerValidator(){
		this.outputVar = "test";
	}

	//app.swagger = SwaggerValidator;
	app.swagger.root = ng.core.Component({
			selector : 'app-root',
			templateUrl : 'app/swagger/swagger-input.html'
		})
			.Class({
				constructor: SwaggerValidator
			});

}(window.app || (window.app = {})));