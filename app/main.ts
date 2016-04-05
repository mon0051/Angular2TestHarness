import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {SwaggerRoot} from "./swagger/swagger";
import {ROUTER_PROVIDERS,RouteConfig,ROUTER_DIRECTIVES} from "angular2/router";
import {AutoTestRunner} from "./test/auto-test-runner";

@Component({
	directives: [SwaggerRoot,ROUTER_DIRECTIVES],
	selector: "app-root",
	templateUrl: "app/page-template.html"
})
@RouteConfig([
	{path:"/", name: 'SwaggerRoot', component:SwaggerRoot},
	{path:"/autoTests", name: "AutoTests", component:AutoTestRunner}
])
export class AppRoot {
	constructor() {
	}
}

bootstrap(AppRoot,[ROUTER_PROVIDERS]);