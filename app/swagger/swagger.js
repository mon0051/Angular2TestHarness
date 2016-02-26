System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var SwaggerRoot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SwaggerRoot = (function () {
                function SwaggerRoot(settings, cirtsClient) {
                    this.settings = settings;
                    this.cirtsClient = cirtsClient;
                    this.swagger = app.swagger.spec;
                }
                SwaggerRoot.prototype.pathArray = function () {
                    var paths = [];
                    for (var path in this.swagger.spec.paths) {
                        if (this.swagger.spec.paths.hasOwnProperty(path)) {
                            paths[paths.length] = path;
                        }
                    }
                    return paths;
                };
                SwaggerRoot.prototype.getCirts = function (resource, params) {
                    this.cirtsClient.httpGet(resource, function (r) { this.successDo(r); }, function (r) { this.failDo(r); }, params);
                };
                SwaggerRoot.successDo = function (result) {
                    alert(JSON.stringify(result));
                };
                SwaggerRoot.failDo = function (result) {
                    alert((JSON.stringify(result)));
                };
                SwaggerRoot = __decorate([
                    core_1.Component({
                        directives: [common_1.NgFor, common_1.NgFormControl, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        selector: 'swagger',
                        templateUrl: 'app/swagger/swagger.html',
                        providers: [app.CirtsClient]
                    }), 
                    __metadata('design:paramtypes', [Object, Object])
                ], SwaggerRoot);
                return SwaggerRoot;
            })();
            exports_1("SwaggerRoot", SwaggerRoot);
        }
    }
});
//# sourceMappingURL=app.swagger.js.map