import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {SwaggerRoot} from "./swagger/swagger";

@Component({
	directives: [SwaggerRoot],
	selector: 'app-root',
	templateUrl: 'app/page-template.html'
})
export class AppRoot {

	constructor() {
	}
}

bootstrap(AppRoot);