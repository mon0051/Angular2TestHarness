System.register(["angular2/core", "angular2/platform/browser", "./swagger/swagger", "angular2/router", "./test/auto-test-runner", "./test/swagger-validate"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, swagger_1, router_1, auto_test_runner_1, swagger_validate_1;
    var AppRoot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (swagger_1_1) {
                swagger_1 = swagger_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auto_test_runner_1_1) {
                auto_test_runner_1 = auto_test_runner_1_1;
            },
            function (swagger_validate_1_1) {
                swagger_validate_1 = swagger_validate_1_1;
            }],
        execute: function() {
            AppRoot = (function () {
                function AppRoot() {
                    var p = new swagger_validate_1.SwaggerValidator();
                }
                AppRoot = __decorate([
                    core_1.Component({
                        directives: [swagger_1.SwaggerRoot, router_1.ROUTER_DIRECTIVES],
                        selector: "app-root",
                        templateUrl: "app/page-template.html"
                    }),
                    router_1.RouteConfig([
                        { path: "/", name: 'TestHarness', component: swagger_1.SwaggerRoot },
                        { path: "/autoTests", name: "AutoTests", component: auto_test_runner_1.AutoTestRunner }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppRoot);
                return AppRoot;
            }());
            exports_1("AppRoot", AppRoot);
            browser_1.bootstrap(AppRoot, [router_1.ROUTER_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map