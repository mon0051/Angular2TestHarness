import {AppSettings} from "../settings/settings";
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

	hash(method, resource, timestamp, nonce, contents, params) {
		var sig = this.signature(method, resource, timestamp, nonce, contents, params);
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
				throw "Bad Input for CirtsClint.generateId(len)";
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

	call(method, resource, contents, success, fail, params, output?) {
		var contentString = (contents ? JSON.stringify(contents) : null);
		var client = this;
		var nonce = CirtsClient.generateId();
		jQuery.ajax(this.settings.host + this.settings.basePath + resource,
			{
				method: method,
				contentType: 'application/json',
				data: contentString,
				dataType: 'json',
				url: this.settings.basePath + resource + params,
				beforeSend: function (xhr) {
					var timestampString = new Date().toUTCString();
					xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client.settings.username + ':' + client.settings.password));
					xhr.setRequestHeader('X-Api-Key', client.settings.apiId + ':' + client.hash(method, resource, timestampString, nonce, contentString, params));
					xhr.setRequestHeader('X-Timestamp', timestampString);
					xhr.setRequestHeader('X-Nonce', nonce);
				}
			})
			.done(function (r) {
				success(r);
				if(output){
					output.successDo(r);
				}
			})
			.fail(function (r) {
				fail(r);
				if(output){
					output.successDo(r);
				}
			});
	};

	signature(method, resource, timestamp, nonce, contents, params) {
		// todo: query params
		// /Lwb.Cirts.WebService/api/Ping
		// Mon, 15 Jun 2015 04:01:00 GMT
		var signature = method + '\n' + this.settings.basePath + resource + '\n' + timestamp + '\n' + nonce + '\n';
		if (contents) {
			signature = signature + contents + '\n';
		}

		return signature;
	};

	constructor(settings?:AppSettings) {
		this.settings = settings || (new AppSettings());
	}
}
