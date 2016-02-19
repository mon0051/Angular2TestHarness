import {AppSettings} from "../settings/settings";

@Component({
	selector: 'swagger-output',
	templateUrl: 'app/swagger/swagger-output.html',
})
export class SwaggerOutput {
	settings:AppSettings;

	constructor(opts) {
		this.settings = opts;
	}
}