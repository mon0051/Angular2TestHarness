import {CirtsClient} from '../cirts/cirts-client';
import {AutoTestRunner} from "./auto-test-runner";

export class AutoTests {
	clientSearchWillFailWithNoQuery(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Will Fail With No Query";
		var success = testRunner.bad(testName);
		var fail = testRunner.good(testName);

		client.httpGet('clients', success, fail, null, null);
	}

	clientSearchWillSucceedWithFamilyName(client:CirtsClient,testRunner:AutoTestRunner) {
		var testName = "Client Search Ok With FamilyName More than 3 chars";
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet('clients?familyName=rubber', succeed, fail, null, null);
	}

	clientSearchWillSucceedWithGivenNames(client:CirtsClient, testRunner:AutoTestRunner){
		var testName = "Client Search Ok With Given Names More than 3 chars";
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet('clients?givenNames=yarble',succeed,fail,null,null);
	}

	clientSearchWillSucceedWithValidCirtsIdSyntax(client:CirtsClient, testRunner:AutoTestRunner){
		var testName = "Client Search Will Succeed With Valid CirtsId Syntax";
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet('clients?cirtsId=CL1000',succeed,fail,null,null);
	}

	clientSearchWillSucceedWithValidCirtsIdSyntaxLowerCase(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Will Succeed With Valid CirtsId Syntax Lower Case";
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet('clients?cirtsId=cl1000', succeed, fail, null, null);
	}

	clientSearchWillFailWithInvalidCirtsIdSyntax(client:CirtsClient, testRunner:AutoTestRunner){
		var testName = "Client Search Will Fail With Invalid CirtsId Syntax(No CL prefix)";
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet('clients?cirtsId=1000', fail, succeed, null, null);
	}

	clientSearchWillFailWithInvalidFamilyNameSyntax(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Will Fail With Invalid FamilyName Syntax";
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet('clients?familyName=b', fail, succeed, null, null);
	}
}