System.register(['angular2/core', '../cirts/cirts-client', "../settings/settings", "./auto-tests"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, cirts_client_1, settings_1, auto_tests_1;
    var AutoTestRunner;
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
            },
            function (auto_tests_1_1) {
                auto_tests_1 = auto_tests_1_1;
            }],
        execute: function() {
            AutoTestRunner = (function () {
                function AutoTestRunner(settings) {
                    this.cirtsClient = new cirts_client_1.CirtsClient();
                    this.settings = settings;
                    this.testOutput = {
                        value: "Running....."
                    };
                    this.runClientListTests();
                }
                AutoTestRunner.prototype.bad = function (testName) {
                    var output = this.testOutput;
                    return function (r) {
                        if (output.value === "Running.....") {
                            output.value = testName + " test failed\n";
                            return;
                        }
                        output.value += testName + " test failed\n";
                    };
                };
                AutoTestRunner.prototype.good = function (testName) {
                    var output = this.testOutput;
                    return function (r) {
                        if (output.value === "Running.....") {
                            output.value = testName + " test succeeded\n";
                            return;
                        }
                        output.value += testName + " test succeeded\n";
                    };
                };
                AutoTestRunner.prototype.runClientListTests = function () {
                    var client = this.cirtsClient;
                    var settings = this.settings;
                    var tests = new auto_tests_1.AutoTests();
                    for (var test in tests) {
                        tests[test](client, this);
                    }
                };
                AutoTestRunner = __decorate([
                    core_1.Component({
                        providers: [settings_1.AppSettings],
                        templateUrl: 'app/swagger/auto-tests.html',
                        selector: 'auto-test-output'
                    }), 
                    __metadata('design:paramtypes', [settings_1.AppSettings])
                ], AutoTestRunner);
                return AutoTestRunner;
            })();
            exports_1("AutoTestRunner", AutoTestRunner);
        }
    }
});
//# sourceMappingURL=auto-test-runner.js.map