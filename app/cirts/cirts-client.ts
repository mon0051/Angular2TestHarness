import {AppSettings} from "../settings/settings";
import {SwaggerRoot} from "../swagger/swagger";
declare var jQuery:any;
declare var jsSHA:any;

export class CirtsClient {
	settings:AppSettings;

	httpGet(resource, success, fail, params, output) {
		this.call('GET', resource, null, success, fail, params, output);
	};

	post(resource, content, success, fail, params, output) {
		this.call('POST', resource, content, success, fail, params, output);
	};

	hash(method, resource, timestamp, nonce ,output) {
		var sig = this.signature(method, resource, timestamp, nonce);
		var sha = new jsSHA('SHA-256', 'TEXT'); //jshint ignore:line, this is a library
		sha.setHMACKey('MQpE1iRhe3jPfNQL/CIoRg==', 'B64');
		sha.update(sig);

		return sha.getHMAC('B64');
	};

	static generateId(len?) {
		var zeroString = (function (l) {
			if (!l) {
				return '0000000000000000';
			}
			if (typeof l !== "number") {
				throw "Bad Input for CirtsClient.generateId(len)";
			}

			var result = "";

			while (l > 0) {
				l++;
				result += "0";
			}
			return result;

		}(len));

		return (Math.random().toString(36) + zeroString).slice(2, 16);
	};

	call(method, resource, contents, success, fail, params, output?:SwaggerRoot) {
		var contentString = (contents ? JSON.stringify(contents) : null);
		var client = this;
		var nonce = CirtsClient.generateId();
		var timestampString = new Date().toUTCString();
		var hash = client.hash(method, resource, timestampString, nonce, output);
		jQuery.ajax(this.settings.host + this.settings.basePath + resource,
			{
				method: method,
				contentType: 'application/json',
				data: contentString,
				dataType: 'json',
				url: this.settings.basePath + resource + params,
				beforeSend: function (xhr) {

					xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client.settings.username + ':' + client.settings.password));
					xhr.setRequestHeader('X-Api-Key', client.settings.apiId + ':' + hash);
					xhr.setRequestHeader('X-Timestamp', timestampString);
					xhr.setRequestHeader('X-Nonce', nonce);
					
				}
			})
			.done(function (r) {
				success(r);
				if(output){
					output.successDo()(r);
				}
			})
			.fail(function (r) {
				fail(r);
				if(output){
					output.successDo()(r);
				}
			});
	};

	signature(timestamp, nonce) {
		// todo: query params
		// /Lwb.Cirts.WebService/api/Ping
		// Mon, 15 Jun 2015 04:01:00 GMT
		var signature = timestamp + '\n' + nonce + '\n';
		/*if (contents) {
			signature = signature + contents + '\n';
		}*/

		return signature;
	};

	constructor(settings?:AppSettings) {
		this.settings = settings || (new AppSettings());
	}
}
