(function (app) {
	var randomService = ng.core.Class({
		constructor: function(){this.name="rando"}
	});

	var a2 = using("app","meltr");

	app.root = ng.core.Component({
		directives: [app.navbar],
		selector: 'app-root',
		templateUrl: 'app/page-template.html',
		//providers: [ng.core.provide({}, {useClass: app.swagger.root})]
	}).Class({
		constructor: function(){}
	});

	document.addEventListener('DOMContentLoaded', function () {
		ng.platform.browser.bootstrap(app.root);
	});

})(window.app || (window.app = {}));