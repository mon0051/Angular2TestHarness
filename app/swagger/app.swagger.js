(function(app){
	'use strict';

	function SwaggerValidator(){
		this.outputVar = "test";
	}

	//app.swagger = SwaggerValidator;
	app.swagger.root = ng.core.Component({
			directives: [app.swagger.output,app.swagger.input],
			selector : 'swagger',
			templateUrl : 'app/swagger/swagger.html'
		})
			.Class({
				constructor: function SwaggerRoot() {
					
				}
			});

}(window.app || (window.app = {})));
