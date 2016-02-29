System.register(['angular2/core', '../cirts/cirts-client', "../settings/settings"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, cirts_client_1, settings_1;
    var AutoTests;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cirts_client_1_1) {
                cirts_client_1 = cirts_client_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            AutoTests = (function () {
                function AutoTests(settings) {
                    this.cirtsClient = new cirts_client_1.CirtsClient();
                    this.settings = settings;
                    this.testOutput = { value: "Running....." };
                    this.runClientListTests();
                }
                AutoTests.prototype.bad = function (testName) {
                    var output = this.testOutput;
                    return function (r) {
                        if (output.value === "Running.....") {
                            output.value = " ";
                        }
                        output.value += testName + " test failed\n";
                    };
                };
                AutoTests.prototype.good = function (testName) {
                    var output = this.testOutput;
                    return function (r) {
                        if (output.value === "Running.....") {
                            output.value = " ";
                        }
                        output.value += testName + " test succeded\n";
                    };
                };
                AutoTests.prototype.runClientListTests = function () {
                    var client = this.cirtsClient;
                    var settings = this.settings;
                    this.clientSearchWillFailWithNoQuery(client, settings);
                };
                AutoTests.prototype.clientSearchWillFailWithNoQuery = function (client, settings) {
                    var output = this;
                    var params = null;
                    client.httpGet('clients', this.bad("clientSearchWillFailWithNoQuery"), this.good("clientSearchWillFailWithNoQuery"), params, null);
                };
                AutoTests = __decorate([
                    core_1.Component({
                        providers: [settings_1.AppSettings],
                        templateUrl: 'app/swagger/auto-tests.html',
                        selector: 'auto-test-output'
                    }), 
                    __metadata('design:paramtypes', [settings_1.AppSettings])
                ], AutoTests);
                return AutoTests;
            })();
            exports_1("AutoTests", AutoTests);
        }
    }
});
//# sourceMappingURL=auto-tests.js.map