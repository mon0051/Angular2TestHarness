(function (app, ng) {
    'use strict';
    app.swagger.SwaggerSpec = ng.core.Class({
        constructor: function () {
            this.swagger = app.swagger.swagger;
        }
    });
    function SwaggerUtility() {
        this.getSchemaProperties = function (schema) {
            var properties = {};
            if (schema.items !== undefined) {
                properties = schema.items.properties;
            }
            else {
                properties = schema.properties;
            }
            return properties;
        };
        this.validateTitle = function (title, path) {
            var schemaTitle = path.get.responses["200"].schema.title;
            return schemaTitle === title;
        };
        this.validatePropertyType = function (responsePropertyKey, responsePropertyValue, schema) {
            var expectedProperties = this.getSchemaProperties(schema);
            var expectedType = expectedProperties[responsePropertyKey].type;
            return typeof responsePropertyValue === expectedType;
        };
        this.validatePropertyExpected = function (property, schema) {
            var expectedProperties = this.getSchemaProperties(schema);
            return expectedProperties[property] !== undefined;
        };
        this.getMissingProperties = function (responseObject, paths) {
            var expectedProperties = this.getSchemaProperties(paths);
            var missingProperties = [];
            for (var prop in expectedProperties) {
                if (expectedProperties.hasOwnProperty(prop) && responseObject[prop] === undefined) {
                    missingProperties[missingProperties.length] = prop;
                }
            }
            return missingProperties;
        };
    }
    app.swagger.SwaggerUtilityProvider = ng.core.Class({
        constructor: SwaggerUtility
    });
}(window.app || (window.app = {}), ng));
//# sourceMappingURL=app.swagger.util.js.map