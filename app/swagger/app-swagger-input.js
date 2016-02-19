System.register(['angular2/core', 'angular2/common', "./app.swagger.spec"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, common_2, common_3, common_4, app_swagger_spec_1;
    var SwaggerInput;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
                common_2 = common_1_1;
                common_3 = common_1_1;
                common_4 = common_1_1;
            },
            function (app_swagger_spec_1_1) {
                app_swagger_spec_1 = app_swagger_spec_1_1;
            }],
        execute: function() {
            SwaggerInput = (function () {
                function SwaggerInput(settings, cirtsClient) {
                    this.settings = settings;
                    this.cirtsClient = cirtsClient;
                    this.swagger = new app_swagger_spec_1.SwaggerSpec;
                    this.apiSelector = { name: "" };
                    this.getCirts = function (apiPath, params) {
                        alert(JSON.stringify(apiPath));
                    };
                }
                SwaggerInput.prototype.pathArray = function () {
                    var paths = [];
                    for (var path in this.swagger.spec.paths) {
                        if (this.swagger.spec.paths.hasOwnProperty(path)) {
                            paths[paths.length] = path;
                        }
                    }
                    return paths;
                };
                SwaggerInput.successDo = function (result) {
                    alert(JSON.stringify(result));
                };
                SwaggerInput.failDo = function (result) {
                    alert((JSON.stringify(result)));
                };
                SwaggerInput = __decorate([
                    core_1.Component({
                        directives: [common_1.NgFor, common_2.NgFormControl, common_3.CORE_DIRECTIVES, common_4.FORM_DIRECTIVES],
                        selector: 'swagger-input',
                        templateUrl: 'app/swagger/app-swagger-input.html',
                        providers: [app.swagger.SwaggerUtilityProvider, app.AppSettings, app.CirtsClient]
                    }), 
                    __metadata('design:paramtypes', [Object, Object])
                ], SwaggerInput);
                return SwaggerInput;
            })();
            exports_1("SwaggerInput", SwaggerInput);
        }
    }
});
//# sourceMappingURL=app-swagger-input.js.map