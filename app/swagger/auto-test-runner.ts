import {Component} from 'angular2/core';
import {CirtsClient} from '../cirts/cirts-client';
import {AppSettings} from "../settings/settings";
import {AutoTests} from "./auto-tests";

@Component({
	providers: [AppSettings],
	templateUrl: 'app/swagger/auto-tests.html',
	selector: 'auto-test-output'
})
export class AutoTestRunner {
	cirtsClient:CirtsClient;
	settings:AppSettings;
	testOutput:{value:string};

	bad(testName) {
		var output = this.testOutput;
		return function (r) {
			if (output.value === "Running.....") {
				output.value = testName + " test failed\n";
				return;
			}
			output.value += testName + " test failed\n";
		}
	}

	good(testName) {
		var output = this.testOutput;
		return function (r) {
			if (output.value === "Running.....") {
				output.value = testName + " test succeeded\n";
				return;
			}
			output.value += testName + " test succeeded\n";
		}
	}

	runClientListTests() {
		var client = this.cirtsClient;
		var settings = this.settings;
		var tests = new AutoTests();

		for (var test in tests) {

			tests[test](client, this);

		}
	}


	constructor(settings:AppSettings) {
		this.cirtsClient = new CirtsClient();
		this.settings = settings;
		this.testOutput = {
			value: "Running....."
		};
		this.runClientListTests();
	}
}