import {Component} from 'angular2/core';
import {CirtsClient} from '../cirts/cirts-client';
import {AppSettings} from "../settings/settings";
import {AutoTests} from "./auto-tests";
import {DisplayThinkingHint} from "../common/user-display-hints";

@Component({
	directives:[DisplayThinkingHint],
	providers: [AppSettings],
	templateUrl: 'app/swagger/auto-tests.html',
	selector: 'auto-test-output'
})
export class AutoTestRunner {
	cirtsClient:CirtsClient;
	settings:AppSettings;
	passedTests: Array<string>;
	failedTests:Array<string>;
	runningTests:number;


	bad(testName) {
		var output = this.failedTests;
		var runner = this;
		return function (r) {
			output[output.length] = testName + " test failed\n";
			runner.runningTests--;
		}
	}

	good(testName) {
		var output = this.passedTests;
		var runner = this;
		return function (r) {
			output[output.length] = testName + " test succeeded\n";
			runner.runningTests--;
		}
	}

	runClientListTests() {
		var client = this.cirtsClient;
		var tests = new AutoTests();
		var running = this.runningTests;

		for (var test in tests) {
			try{
				this.runningTests++;
				tests[test](client, this);
			}catch(e){
				this.bad(test);
			}
		}
	}

	constructor(settings:AppSettings) {
		this.cirtsClient = new CirtsClient(settings);
		this.settings = settings;
		this.passedTests = [];
		this.failedTests = [];
		this.runningTests= 0 ;
		this.runClientListTests();
	}
}

export class AutoTestHelpers {
	static GetWillFail(query:string, testName:string, testRunner:AutoTestRunner, client:CirtsClient) {
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet(query, fail, succeed, null, null);
	}

	static GetWillSucceed(query:string, testName:string, testRunner:AutoTestRunner, client:CirtsClient) {
		var succeed = testRunner.good(testName);
		var fail = testRunner.bad(testName);

		client.httpGet(query, succeed, fail, null, null);
	}
}