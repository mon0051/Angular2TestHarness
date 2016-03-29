System.register(["./auto-test-runner"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var auto_test_runner_1;
    var AutoTests;
    return {
        setters:[
            function (auto_test_runner_1_1) {
                auto_test_runner_1 = auto_test_runner_1_1;
            }],
        execute: function() {
            AutoTests = (function () {
                function AutoTests() {
                }
                AutoTests.prototype.clientSearchWillFailWithNoQuery = function (client, testRunner) {
                    var testName = "Client Search Will Fail With No Query";
                    var query = 'clients';
                    auto_test_runner_1.AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientSearchWillSucceedWithFamilyName = function (client, testRunner) {
                    var testName = "Client Search Returns Ok With FamilyName More than 2 chars";
                    var query = 'clients?familyName=rubber';
                    auto_test_runner_1.AutoTestHelpers.GetWillSucceed(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientSearchWillSucceedWithGivenNames = function (client, testRunner) {
                    var testName = "Client Search Returns Ok With Given Names More than 2 chars";
                    var query = 'clients?givenNames=ya';
                    auto_test_runner_1.AutoTestHelpers.GetWillSucceed(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientSearchWillSucceedWithValidCirtsIdSyntax = function (client, testRunner) {
                    var testName = "Client Search Returns Ok With Valid CirtsId Syntax";
                    var query = 'clients?cirtsId=CL1000';
                    auto_test_runner_1.AutoTestHelpers.GetWillSucceed(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientSearchWillSucceedWithValidCirtsIdSyntaxLowerCase = function (client, testRunner) {
                    var testName = "Client Search Returns Ok With Valid CirtsId Syntax Lower Case";
                    var query = 'clients?cirtsId=cl1000';
                    auto_test_runner_1.AutoTestHelpers.GetWillSucceed(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientSearchWillFailWithInvalidCirtsIdSyntax = function (client, testRunner) {
                    var testName = "Client Search Will Fail With Invalid CirtsId Syntax(No CL prefix)";
                    var query = 'clients?cirtsId=1000';
                    auto_test_runner_1.AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientSearchWillFailWithInvalidFamilyNameSyntax = function (client, testRunner) {
                    var testName = "Client Search Will Fail With Invalid FamilyName Syntax";
                    var query = 'clients?familyName=b';
                    auto_test_runner_1.AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientSearchWillFailWithInvalidGivenNameSyntax = function (client, testRunner) {
                    var testName = "Client Search Will Fail With Invalid GivenNames Syntax";
                    var query = 'clients?givenNames=b';
                    auto_test_runner_1.AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientDetailWillFailWithNoCLPrefixOnCirtsId = function (client, testRunner) {
                    var testName = "Client Detail Will Fail With No CL Prefix On CirtsId";
                    var query = 'clients/2020';
                    auto_test_runner_1.AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientDetailWillFailWithNonExistentCirtsId = function (client, testRunner) {
                    var testName = "Client Detail Will Fail With Non Existent CirtsId";
                    var query = 'clients/CL9999999';
                    auto_test_runner_1.AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
                };
                AutoTests.prototype.clientDetailWillFailWithInvalidCirtsIdSyntax = function (client, testRunner) {
                    var testName = "Client Detail Will Fail With Invalid CirtsId Syntax";
                    var query = 'clients/CLplop';
                    auto_test_runner_1.AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
                };
                return AutoTests;
            }());
            exports_1("AutoTests", AutoTests);
        }
    }
});
//# sourceMappingURL=auto-tests.js.map