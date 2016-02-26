import {Component} from 'angular2/core';
import {NgFor,NgFormControl,CORE_DIRECTIVES,FORM_DIRECTIVES} from 'angular2/common';
import {CirtsClient} from "../cirts/cirts-client";
import {AppSettings} from "../settings/settings";

declare var app:any;


@Component({
	directives: [NgFor, NgFormControl, CORE_DIRECTIVES, FORM_DIRECTIVES],
	selector: 'swagger',
	templateUrl: 'app/swagger/swagger.html',
	providers: [app.CirtsClient]
})
export class SwaggerRoot {
	settings:AppSettings;
	cirtsClient:CirtsClient;
	swagger:any;

	pathArray() {
		var paths = [];
		for (var path in this.swagger.spec.paths) {
			if (this.swagger.spec.paths.hasOwnProperty(path)) {
				paths[paths.length] = path;
			}
		}
		return paths;
	}

	getCirts(resource,params){
		this.cirtsClient.httpGet(resource, function (r) {this.successDo(r)}, function (r) {this.failDo(r)},params);
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
		this.swagger = app.swagger.spec;

	}
}