import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {App} from './init';
import {SwaggerRoot} from "./swagger/app.swagger";

@Component({
	directives: [SwaggerRoot],
	selector: 'app-root',
	templateUrl: 'app/page-template.html'
	//providers: [ng.core.provide({}, {useClass: app.swagger.root})]
})
export class AppRoot {

	constructor() {
	}
}

bootstrap(AppRoot);