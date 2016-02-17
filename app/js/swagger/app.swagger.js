(function (util) {
	'use strict';
	var $ = jQuery;
	util.paths = util.spec.paths;

	util.resourcePathTemplate = function () {
		return "/" + $("#endpoint-selector").val();
	};
	util.output = function () {
		return $("#swagger-errors");
	};
	util.show = function (message) {
		util.output().append(message);
	};
	util.clearMessages = function () {
		util.output().empty();
	};
	util.input = function () {
		return $("#swagger-generated-input");
	};

	var show = util.show;

	util.getRequestModel = function () {
		var endpoints = util.resourcePathTemplate().split("/");

		var pathBuilder = [];

		function PathObject(n, t) {
			this.name = n;
			this.valueType = t;
		}

		endpoints.forEach(function (value) {
			if (value === "") {
				return;
			}
			if (value.endsWith('}')) {
				pathBuilder[pathBuilder.length] = new PathObject(value.replace('{', '').replace('}', ''), "parameter");
			} else {
				pathBuilder[pathBuilder.length] = new PathObject(value, "pathComponent");
			}
		});

		return pathBuilder;
	};

	util.getSchemaProperties = function () {
		var schema = util.paths[util.resourcePathTemplate()].get.responses["200"].schema;
		var properties = {};
		if (schema.items) {
			properties = schema.items.properties;
		} else {
			properties = schema.properties;
		}
		return properties;
	};

	util.validateTitle = function (title) {
		var schemaTitle = util.paths[util.resourcePathTemplate()].get.responses["200"].schema.title;

		if (schemaTitle === title) {
			show(messages.h4("Found Expected Object : " + JSON.stringify(title) + " : {...}"));
		} else {
			show("For endpoint \"" + util.resourcePathTemplate() + "\" ");
			show(" unexpected object found \"" + title + "\"\n");
			throw "unexpected object";
		}
	};

	util.validatePropertyType = function (responsePropertyKey, responsePropertyValue) {
		var expectedProperties = util.getSchemaProperties();
		var expectedType = expectedProperties[responsePropertyKey].type;

		if (typeof responsePropertyValue === expectedType) {
			show(messages.correctType(expectedType, typeof responsePropertyValue));
		} else {
			show(messages.incorrectType(expectedType, typeof responsePropertyValue));
		}
	};

	util.validatePropertyExpected = function (responsePropertyKey) {
		var expectedProperties = util.getSchemaProperties();

		if (expectedProperties[responsePropertyKey] === undefined) {
			show(messages.propertyWasNotExpected(responsePropertyKey));
			return false;

		} else {
			show(messages.propertyWasExpected(responsePropertyKey));
			return true;
		}
	};

	util.ensureAllPropertiesExist = function (responseObject) {
		var expectedProperties = util.getSchemaProperties();

		for (var prop in expectedProperties) {
			if (expectedProperties.hasOwnProperty(prop) && responseObject[prop] === undefined) {
				util.output().append("<p class=\"text-error\"> Property from schema " + prop + " is missing </p>");
			}
		}
	};
}(app.swagger || (app.swagger = {})));