import {Component} from 'angular2/core';
import {SwaggerInput} from "./app-swagger-input";
import {SwaggerOutput} from "./app.swagger.output";

@Component({
	directives: [SwaggerOutput, SwaggerInput],
	selector: 'swagger',
	templateUrl: 'app/swagger/swagger.html',
	providers: [app.CirtsClient]
})
export class SwaggerRoot {
	version:string;
	call:Function;

	constructor() {
		this.version = "0.0.1";
		this.call = function () {
			alert();
		};
	}
}