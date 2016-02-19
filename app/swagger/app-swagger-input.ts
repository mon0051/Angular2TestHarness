import {AppSettings} from '../settings/settings';
import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {NgFormControl} from 'angular2/common';
import {CORE_DIRECTIVES} from 'angular2/common';
import {FORM_DIRECTIVES} from 'angular2/common';
import {CirtsClient} from "../cirts-pipes/app.cirts-client";
import {SwaggerSpec} from "./app.swagger.spec";

@Component({
	directives: [NgFor, NgFormControl, CORE_DIRECTIVES, FORM_DIRECTIVES],
	selector: 'swagger-input',
	templateUrl: 'app/swagger/app-swagger-input.html',
	providers: [app.swagger.SwaggerUtilityProvider, app.AppSettings, app.CirtsClient]
})
export class SwaggerInput {
	settings:AppSettings;
	cirtsClient:CirtsClient;
	swagger:SwaggerSpec;
	pathArray() {
		var paths = [];
		for (var path in this.swagger.spec.paths) {
			if (this.swagger.spec.paths.hasOwnProperty(path)) {
				paths[paths.length] = path;
			}
		}
		return paths;
	}
	static successDo(result) {
		alert(JSON.stringify(result));
	}

	static failDo(result) {
		alert((JSON.stringify(result)));
	}
	constructor(settings, cirtsClient) {
		this.settings = settings;
		this.cirtsClient = cirtsClient;
		this.swagger = new SwaggerSpec;

		this.apiSelector = {name: ""};

		this.getCirts = function (apiPath, params) {
			alert(JSON.stringify(apiPath));
		};


	}
}