import {HtmlHelper}from '../common/HtmlHelper';
import {Component} from 'angular2/core';
import {NgFor,NgFormControl,CORE_DIRECTIVES,FORM_DIRECTIVES} from 'angular2/common';
import {CirtsClient} from "../cirts/cirts-client";
import {AppSettings} from "../settings/settings";
import {ResponseHelper} from "../common/ResponseHelper";
import {AutoTestRunner} from "./../test/auto-test-runner";

declare var app:any;

@Component({
	directives: [NgFor, NgFormControl, CORE_DIRECTIVES, FORM_DIRECTIVES, AutoTestRunner],
	selector: 'swagger',
	templateUrl: 'app/swagger/swagger.html',
	providers: [AppSettings]
})
export class SwaggerRoot {
	me:SwaggerRoot = this;
	settings:AppSettings;
	cirtsClient:CirtsClient;
	swagger:any;
	selectedPath:string;
	query:string;
	uriParameters:string;
	result:any ;
	swaggerValidation:any;
	sentHash:string;

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

		this.cirtsClient.httpGet(fullResource, this.successDo(), this.failDo(), "", this);
	}

	expectedQuery() {
		var qry = HtmlHelper.parseQuery(this.query);
		var end = HtmlHelper.parseEndpoint(this.selectedPath, this.uriParameters);
		var endpoint = HtmlHelper.build(end, qry);

		return this.settings.host + this.settings.basePath + endpoint;
	}

	successDo() {
		var self = this;

		return function (httpResult) {
			self.result = JSON.stringify(httpResult, null, 4);
		}
	}

	failDo() {
		var self = this;
		return function (httpResult) {
			self.result = JSON.stringify(httpResult, null, 4);
		}

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

	updateSentHash(s:string){
		this.sentHash = s;
	}

	constructor(settings:AppSettings) {
		this.settings = settings;
		this.cirtsClient = new CirtsClient(settings);
		this.swagger = app.swagger.spec;
		this.selectedPath = "";
	}
}