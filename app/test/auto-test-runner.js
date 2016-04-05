System.register(['angular2/core', '../cirts/cirts-client', "../settings/settings", "./auto-tests", "../common/user-display-hints"], function(exports_1, context_1) {
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
    var core_1, cirts_client_1, settings_1, auto_tests_1, user_display_hints_1;
    var AutoTestRunner, AutoTestHelpers;
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
            },
            function (user_display_hints_1_1) {
                user_display_hints_1 = user_display_hints_1_1;
            }],
        execute: function() {
            AutoTestRunner = (function () {
                function AutoTestRunner(settings) {
                    this.cirtsClient = new cirts_client_1.CirtsClient(settings);
                    this.settings = settings;
                    this.passedTests = [];
                    this.failedTests = [];
                    this.runningTests = 0;
                    this.runClientListTests();
                }
                AutoTestRunner.prototype.bad = function (testName) {
                    var output = this.failedTests;
                    var runner = this;
                    return function (r) {
                        output[output.length] = testName + " test failed\n" + JSON.stringify(r, null, 4);
                        runner.runningTests--;
                    };
                };
                AutoTestRunner.prototype.good = function (testName) {
                    var output = this.passedTests;
                    var runner = this;
                    return function (r) {
                        output[output.length] = testName + " test succeeded\n";
                        runner.runningTests--;
                    };
                };
                AutoTestRunner.prototype.runClientListTests = function () {
                    var client = this.cirtsClient;
                    var tests = new auto_tests_1.AutoTests();
                    var running = this.runningTests;
                    for (var test in tests) {
                        try {
                            this.runningTests++;
                            tests[test](client, this);
                        }
                        catch (e) {
                            this.bad(test);
                        }
                    }
                };
                AutoTestRunner = __decorate([
                    core_1.Component({
                        directives: [user_display_hints_1.DisplayThinkingHint],
                        providers: [settings_1.AppSettings],
                        templateUrl: 'app/test/auto-tests.html',
                        selector: 'auto-test-output'
                    }), 
                    __metadata('design:paramtypes', [settings_1.AppSettings])
                ], AutoTestRunner);
                return AutoTestRunner;
            }());
            exports_1("AutoTestRunner", AutoTestRunner);
            AutoTestHelpers = (function () {
                function AutoTestHelpers() {
                }
                AutoTestHelpers.GetWillFail = function (query, testName, testRunner, client) {
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet(query, fail, succeed, null, null);
                };
                AutoTestHelpers.GetWillSucceed = function (query, testName, testRunner, client) {
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet(query, succeed, fail, null, null);
                };
                return AutoTestHelpers;
            }());
            exports_1("AutoTestHelpers", AutoTestHelpers);
        }
    }
});
//# sourceMappingURL=auto-test-runner.js.map