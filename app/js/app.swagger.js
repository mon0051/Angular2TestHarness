(function (app) {
	app.AppComponent =
		ng.core.Component({
				selector: 'swagger-input',
				template: '<h2>Swagger Input</h2>'
			})
			.Class({
				constructor: function () {
				}
			});
})(window.app || (window.app = {}));
