(function (app) {
	'use strict';
	var $ = jQuery;
	var swagger = app.swagger || (app.swagger={});
	var util = swagger.util || (swagger.util = {});

	util.paths = swagger.spec.paths;

	util.resourcePathTemplate = function () {
		return "/" + $("#endpoint-selector").val();
	};

	util.output = function () {
		return $("#swagger-errors");
	};

	util.show = function (message) {
		swagger.output().append(message);
	};

	util.clearMessages = function () {
		swagger.output().empty();
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
		var schema = swagger.paths[swagger.resourcePathTemplate()].get.responses["200"].schema;
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
			show(app.messages.h4("Found Expected Object : " + JSON.stringify(title) + " : {...}"));
		} else {
			show("For endpoint \"" + util.resourcePathTemplate() + "\" ");
			show(" unexpected object found \"" + title + "\"\n");
			throw "unexpected object";
		}
	};

	util.validatePropertyType = function (responsePropertyKey, responsePropertyValue) {
		var expectedProperties = swagger.getSchemaProperties();
		var expectedType = expectedProperties[responsePropertyKey].type;

		if (typeof responsePropertyValue === expectedType) {
			show(app.messages.correctType(expectedType, typeof responsePropertyValue));
		} else {
			show(app.messages.incorrectType(expectedType, typeof responsePropertyValue));
		}
	};

	util.validatePropertyExpected = function (responsePropertyKey) {
		var expectedProperties = swagger.getSchemaProperties();

		if (expectedProperties[responsePropertyKey] === undefined) {
			show(app.messages.propertyWasNotExpected(responsePropertyKey));
			return false;

		} else {
			show(app.messages.propertyWasExpected(responsePropertyKey));
			return true;
		}
	};

	util.ensureAllPropertiesExist = function (responseObject) {
		var expectedProperties = swagger.getSchemaProperties();

		for (var prop in expectedProperties) {
			if (expectedProperties.hasOwnProperty(prop) && responseObject[prop] === undefined) {
				swagger.output().append("<p class=\"text-error\"> Property from schema " + prop + " is missing </p>");
			}
		}
	};
}(window.app || (window.app = {})));
