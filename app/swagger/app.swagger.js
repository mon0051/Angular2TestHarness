System.register(['angular2/core', "./app-swagger-input", "./app.swagger.output"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, app_swagger_input_1, app_swagger_output_1;
    var SwaggerRoot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_swagger_input_1_1) {
                app_swagger_input_1 = app_swagger_input_1_1;
            },
            function (app_swagger_output_1_1) {
                app_swagger_output_1 = app_swagger_output_1_1;
            }],
        execute: function() {
            SwaggerRoot = (function () {
                function SwaggerRoot() {
                    this.version = "0.0.1";
                    this.call = function () {
                        alert();
                    };
                }
                SwaggerRoot = __decorate([
                    core_1.Component({
                        directives: [app_swagger_output_1.SwaggerOutput, app_swagger_input_1.SwaggerInput],
                        selector: 'swagger',
                        templateUrl: 'app/swagger/swagger.html',
                        providers: [app.CirtsClient]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SwaggerRoot);
                return SwaggerRoot;
            })();
            exports_1("SwaggerRoot", SwaggerRoot);
        }
    }
});
//# sourceMappingURL=app.swagger.js.map