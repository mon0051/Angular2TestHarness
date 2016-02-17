window.app = {};
window.app.cirts = {uninitialized: true};
window.app.swaggerSpecs = {uninitialized: true};
window.app.cirtsSettings = {uninitialized: true};
window.app.swaggerValidator = {uninitialized: true};
window.app.extensions = {uninitialized: true};

var app = window.app;

(function (app) {
	'use strict';
	app.ensure = function (module) {
		if (!app[module] || !!app[module].uninitialized) {
			throw "Missing Module :" + module.toString();
		}
		return app[module];
	};
}(window.app));

var ensure = app.ensure;