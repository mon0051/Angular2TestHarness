(function (app, ng) {
    'use strict';
    function SwaggerInfo() {
    }
    app.swagger.SwaggerInfoProvider = ng.core.Component({
        selector: 'swagger-info',
        templateUrl: 'app/swagger/swagger-SwaggerInfoProvider.html'
    }).Class({
        constructor: SwaggerInfo
    });
}(window.app || (window.app = {}), ng));
//# sourceMappingURL=app.swagger.info.js.map