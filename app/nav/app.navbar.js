(function (app) {
	app.navbar = ng.core.Component({
			selector: 'ng-navbar',
			templateUrl: 'app/nav/navbar.html'
		})
		.Class({
			constructor: function () {
				this.test = "testing"
			}
		});
}(window.app || (window.app = {})));
