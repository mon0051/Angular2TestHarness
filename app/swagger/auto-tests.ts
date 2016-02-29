import {Component} from 'angular2/core';
import {CirtsClient} from '../cirts/cirts-client';
import {AppSettings} from "../settings/settings";


@Component({
	providers: [AppSettings],
	templateUrl: 'app/swagger/auto-tests.html',
	selector: 'auto-test-output'
})
export class AutoTests {
	cirtsClient:CirtsClient;
	settings:AppSettings;
	testOutput:{value:string};

	bad(testName:string) {
		var output = this.testOutput;
		return function (r) {
			if(output.value === "Running....."){
				output.value = " ";
			}
			output.value += testName+" test failed\n";
		}
	}

	good(testName:string) {
		var output = this.testOutput;
		return function(r) {
			if (output.value === "Running.....") {
				output.value = " ";
			}
			output.value += testName+ " test succeded\n";
		}
	}

	runClientListTests() {
		var client = this.cirtsClient;
		var settings = this.settings;

		this.clientSearchWillFailWithNoQuery(client, settings);
	}

	clientSearchWillFailWithNoQuery(client:CirtsClient, settings:AppSettings) {
		var output = this;
		var params = null;

		client.httpGet('clients', this.bad("clientSearchWillFailWithNoQuery"), this.good("clientSearchWillFailWithNoQuery"), params, null);
	}

	constructor(settings:AppSettings) {
		this.cirtsClient = new CirtsClient();
		this.settings = settings;
		this.testOutput = {value:"Running....."};
		this.runClientListTests();
	}
}