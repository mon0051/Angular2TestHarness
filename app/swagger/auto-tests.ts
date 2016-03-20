import {CirtsClient} from '../cirts/cirts-client';
import {AutoTestRunner,AutoTestHelpers} from "./auto-test-runner";

export class AutoTests {

	clientSearchWillFailWithNoQuery(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Will Fail With No Query";
		var query = 'clients';

		AutoTestHelpers.GetWillFail(query,testName,testRunner,client);
	}

	clientSearchWillSucceedWithFamilyName(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Returns Ok With FamilyName More than 2 chars";
		var query = 'clients?familyName=rubber';

		AutoTestHelpers.GetWillSucceed(query,testName,testRunner,client);
	}

	clientSearchWillSucceedWithGivenNames(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Returns Ok With Given Names More than 2 chars";
		var query = 'clients?givenNames=ya';

		AutoTestHelpers.GetWillSucceed(query, testName, testRunner, client);
	}

	clientSearchWillSucceedWithValidCirtsIdSyntax(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Returns Ok With Valid CirtsId Syntax";
		var query = 'clients?cirtsId=CL1000';

		AutoTestHelpers.GetWillSucceed(query, testName, testRunner, client);
	}

	clientSearchWillSucceedWithValidCirtsIdSyntaxLowerCase(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Returns Ok With Valid CirtsId Syntax Lower Case";
		var query = 'clients?cirtsId=cl1000';

		AutoTestHelpers.GetWillSucceed(query, testName, testRunner, client);
	}

	clientSearchWillFailWithInvalidCirtsIdSyntax(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Will Fail With Invalid CirtsId Syntax(No CL prefix)";
		var query = 'clients?cirtsId=1000';

		AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
	}

	clientSearchWillFailWithInvalidFamilyNameSyntax(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Will Fail With Invalid FamilyName Syntax";
		var query = 'clients?familyName=b';

		AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
	}

	clientSearchWillFailWithInvalidGivenNameSyntax(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Search Will Fail With Invalid GivenNames Syntax";
		var query = 'clients?givenNames=b';

		AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
	}

	clientDetailWillFailWithNoCLPrefixOnCirtsId(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Detail Will Fail With No CL Prefix On CirtsId";
		var query = 'clients/2020';

		AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
	}

	clientDetailWillFailWithNonExistentCirtsId(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Detail Will Fail With Non Existent CirtsId";
		var query = 'clients/CL9999999';

		AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
	}

	clientDetailWillFailWithInvalidCirtsIdSyntax(client:CirtsClient, testRunner:AutoTestRunner) {
		var testName = "Client Detail Will Fail With Invalid CirtsId Syntax";
		var query = 'clients/CLplop';

		AutoTestHelpers.GetWillFail(query, testName, testRunner, client);
	}
}