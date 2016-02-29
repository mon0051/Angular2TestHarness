import {HtmlHelper}from '../common/HtmlHelper';
import {Component} from 'angular2/core';
import {NgFor,NgFormControl,CORE_DIRECTIVES,FORM_DIRECTIVES} from 'angular2/common';
import {CirtsClient} from "../cirts/cirts-client";
import {AppSettings} from "../settings/settings";
import {ResponseHelper} from "../common/ResponseHelper";
import {AutoTests} from "./auto-tests";

declare var app:any;

@Component({
	directives: [NgFor, NgFormControl, CORE_DIRECTIVES, FORM_DIRECTIVES, AutoTests],
	selector: 'swagger',
	templateUrl: 'app/swagger/swagger.html',
	providers: [AppSettings]
})
export class SwaggerRoot {
	settings:AppSettings;
	cirtsClient:CirtsClient;
	swagger:any;
	selectedPath:string;
	query:string;
	uriParameters:string;
	result:any;
	swaggerValidation:any;

	pathArray() {
		var paths = [];
		for (var path in this.swagger.paths) {
			if (this.swagger.paths.hasOwnProperty(path)) {
				paths[paths.length] = path;
			}
		}
		return paths;
	}

	getCirts() {
		this.result = "Running Query...";

		var end = HtmlHelper.parseEndpoint(this.selectedPath, this.uriParameters);
		var qry = HtmlHelper.parseQuery(this.query);
		var fullResource = HtmlHelper.build(end, qry);

		this.cirtsClient.httpGet(fullResource, this.successDo, this.failDo, "", this);
	}

	expectedQuery() {
		var qry = HtmlHelper.parseQuery(this.query);
		var end = HtmlHelper.parseEndpoint(this.selectedPath, this.uriParameters);
		var endpoint = HtmlHelper.build(end, qry);

		return this.settings.host + this.settings.basePath + endpoint;
	}

	successDo(result) {
		this.result = JSON.stringify(result, null, 4);
	}

	failDo(result) {
		this.result = JSON.stringify(result, null, 4);
	}

	output() {
		var r;
		if(this.result){
			r = ResponseHelper.PrettyfieResponse(this.result);
		}

		return "Domain: " +
			this.settings.domain +
			"\nUsername: " +
			this.settings.username +
			"\nUrl: " + this.expectedQuery() +
			"\n" + (r || "");
	}

	constructor(settings:AppSettings) {
		this.settings = settings;
		this.cirtsClient = new CirtsClient(settings);
		this.swagger = app.swagger.spec;
		this.selectedPath = "";
	}
}