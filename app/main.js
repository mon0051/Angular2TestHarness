(function (app) {
	app.root = ng.core.Component({
		directives: [app.swagger.root],
		selector: 'app-root',
		templateUrl: 'app/page-template.html',
		//providers: [ng.core.provide({}, {useClass: app.swagger.root})]
	}).Class({
		constructor: function () {}
	});

	document.addEventListener('DOMContentLoaded', function () {
		ng.platform.browser.bootstrap(app.root);
	});

})(window.app || (window.app = {}));
