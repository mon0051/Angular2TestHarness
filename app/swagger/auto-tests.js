System.register([], function(exports_1) {
    var AutoTests;
    return {
        setters:[],
        execute: function() {
            AutoTests = (function () {
                function AutoTests() {
                }
                AutoTests.prototype.clientSearchWillFailWithNoQuery = function (client, testRunner) {
                    var testName = "Client Search Will Fail With No Query";
                    var success = testRunner.bad(testName);
                    var fail = testRunner.good(testName);
                    client.httpGet('clients', success, fail, null, null);
                };
                AutoTests.prototype.clientSearchWillSucceedWithFamilyName = function (client, testRunner) {
                    var testName = "Client Search Ok With FamilyName More than 3 chars";
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet('clients?familyName=rubber', succeed, fail, null, null);
                };
                AutoTests.prototype.clientSearchWillSucceedWithGivenNames = function (client, testRunner) {
                    var testName = "Client Search Ok With Given Names More than 3 chars";
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet('clients?givenNames=yarble', succeed, fail, null, null);
                };
                AutoTests.prototype.clientSearchWillSucceedWithValidCirtsIdSyntax = function (client, testRunner) {
                    var testName = "Client Search Will Succeed With Valid CirtsId Syntax";
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet('clients?cirtsId=CL1000', succeed, fail, null, null);
                };
                AutoTests.prototype.clientSearchWillSucceedWithValidCirtsIdSyntaxLowerCase = function (client, testRunner) {
                    var testName = "Client Search Will Succeed With Valid CirtsId Syntax Lower Case";
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet('clients?cirtsId=cl1000', succeed, fail, null, null);
                };
                AutoTests.prototype.clientSearchWillFailWithInvalidCirtsIdSyntax = function (client, testRunner) {
                    var testName = "Client Search Will Fail With Invalid CirtsId Syntax(No CL prefix)";
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet('clients?cirtsId=1000', fail, succeed, null, null);
                };
                AutoTests.prototype.clientSearchWillFailWithInvalidFamilyNameSyntax = function (client, testRunner) {
                    var testName = "Client Search Will Fail With Invalid FamilyName Syntax";
                    var succeed = testRunner.good(testName);
                    var fail = testRunner.bad(testName);
                    client.httpGet('clients?familyName=b', fail, succeed, null, null);
                };
                return AutoTests;
            })();
            exports_1("AutoTests", AutoTests);
        }
    }
});
//# sourceMappingURL=auto-tests.js.map