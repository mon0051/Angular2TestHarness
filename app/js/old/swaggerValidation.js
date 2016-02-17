(function (util) {
	'use strict';

	util.validateResponse = function (httpResponse) {
		util.clearMessages();

		for (var obj in httpResponse) {
			if (httpResponse.hasOwnProperty(obj)) {
				try {
					util.validateTitle(obj);
				} catch (e) {
					if (e === "unexpected object") {
						continue;
					}
				}
				var firstObject;

				if (Object.prototype.toString.call(httpResponse[obj]) === '[object Array]') {
					firstObject = httpResponse[obj][0];
				} else {
					firstObject = httpResponse[obj];
				}

				if (firstObject === undefined) {
					util.output().append("Nothing Found");
				}

				for (var prop in firstObject) {
					if (firstObject.hasOwnProperty(prop)) {
						if (util.validatePropertyExpected(prop)) {
							util.validatePropertyType(prop, firstObject[prop]);
						}
						util.show("<br/>");
					}
				}

				util.ensureAllPropertiesExist(firstObject);
			}
		}
	};

}(ensure("swaggerUtils")));

