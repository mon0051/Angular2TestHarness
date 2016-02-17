(function (app) {
	'use strict';
	var swagger = app.swagger;

	var input = swagger.util.input;

	app.swagger.input = ng.core.Component({
		directives:[ng.common.NgFor],
		selector: 'swagger-input',
		templateUrl: 'app/swagger/swagger-input.html'
	}).Class({
		constructor: function SwaggerInput() {
			this.paths = function(){
				var paths = [];
				for(var path in window.app.swagger.spec.paths){
					if(window.app.swagger.spec.paths.hasOwnProperty(path)){
						paths[paths.length] = path;
					}
				}
				return paths;
			}
		}
	});

}(window.app || (window.app = {})));
