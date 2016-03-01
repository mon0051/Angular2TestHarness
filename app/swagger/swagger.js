System.register(['../common/HtmlHelper', 'angular2/core', 'angular2/common', "../cirts/cirts-client", "../settings/settings", "../common/ResponseHelper", "./auto-test-runner"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var HtmlHelper_1, core_1, common_1, cirts_client_1, settings_1, ResponseHelper_1, auto_test_runner_1;
    var SwaggerRoot;
    return {
        setters:[
            function (HtmlHelper_1_1) {
                HtmlHelper_1 = HtmlHelper_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (cirts_client_1_1) {
                cirts_client_1 = cirts_client_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (ResponseHelper_1_1) {
                ResponseHelper_1 = ResponseHelper_1_1;
            },
            function (auto_test_runner_1_1) {
                auto_test_runner_1 = auto_test_runner_1_1;
            }],
        execute: function() {
            SwaggerRoot = (function () {
                function SwaggerRoot(settings) {
                    this.settings = settings;
                    this.cirtsClient = new cirts_client_1.CirtsClient(settings);
                    this.swagger = app.swagger.spec;
                    this.selectedPath = "";
                }
                SwaggerRoot.prototype.pathArray = function () {
                    var paths = [];
                    for (var path in this.swagger.paths) {
                        if (this.swagger.paths.hasOwnProperty(path)) {
                            paths[paths.length] = path;
                        }
                    }
                    return paths;
                };
                SwaggerRoot.prototype.getCirts = function () {
                    this.result = "Running Query...";
                    var end = HtmlHelper_1.HtmlHelper.parseEndpoint(this.selectedPath, this.uriParameters);
                    var qry = HtmlHelper_1.HtmlHelper.parseQuery(this.query);
                    var fullResource = HtmlHelper_1.HtmlHelper.build(end, qry);
                    this.cirtsClient.httpGet(fullResource, this.successDo, this.failDo, "", this);
                };
                SwaggerRoot.prototype.expectedQuery = function () {
                    var qry = HtmlHelper_1.HtmlHelper.parseQuery(this.query);
                    var end = HtmlHelper_1.HtmlHelper.parseEndpoint(this.selectedPath, this.uriParameters);
                    var endpoint = HtmlHelper_1.HtmlHelper.build(end, qry);
                    return this.settings.host + this.settings.basePath + endpoint;
                };
                SwaggerRoot.prototype.successDo = function (result) {
                    this.result = JSON.stringify(result, null, 4);
                };
                SwaggerRoot.prototype.failDo = function (result) {
                    this.result = JSON.stringify(result, null, 4);
                };
                SwaggerRoot.prototype.output = function () {
                    var r;
                    if (this.result) {
                        r = ResponseHelper_1.ResponseHelper.PrettyfieResponse(this.result);
                    }
                    return "Domain: " +
                        this.settings.domain +
                        "\nUsername: " +
                        this.settings.username +
                        "\nUrl: " + this.expectedQuery() +
                        "\n" + (r || "");
                };
                SwaggerRoot = __decorate([
                    core_1.Component({
                        directives: [common_1.NgFor, common_1.NgFormControl, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, auto_test_runner_1.AutoTestRunner],
                        selector: 'swagger',
                        templateUrl: 'app/swagger/swagger.html',
                        providers: [settings_1.AppSettings]
                    }), 
                    __metadata('design:paramtypes', [settings_1.AppSettings])
                ], SwaggerRoot);
                return SwaggerRoot;
            })();
            exports_1("SwaggerRoot", SwaggerRoot);
        }
    }
});
//# sourceMappingURL=swagger.js.map