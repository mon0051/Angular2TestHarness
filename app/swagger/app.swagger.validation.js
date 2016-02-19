System.register([], function(exports_1) {
    var SwaggerValidator;
    return {
        setters:[],
        execute: function() {
            SwaggerValidator = (function () {
                function SwaggerValidator() {
                    this.validateResponse = function (httpResponse) {
                        swagger.clearMessages();
                        for (var obj in httpResponse) {
                            if (httpResponse.hasOwnProperty(obj)) {
                                try {
                                    swagger.validateTitle(obj);
                                }
                                catch (e) {
                                    if (e === "unexpected object") {
                                        continue;
                                    }
                                }
                                var firstObject;
                                if (Object.prototype.toString.call(httpResponse[obj]) === '[object Array]') {
                                    firstObject = httpResponse[obj][0];
                                }
                                else {
                                    firstObject = httpResponse[obj];
                                }
                                if (firstObject === undefined) {
                                    swagger.output().append("Nothing Found");
                                }
                                for (var prop in firstObject) {
                                    if (firstObject.hasOwnProperty(prop)) {
                                        if (swagger.validatePropertyExpected(prop)) {
                                            swagger.validatePropertyType(prop, firstObject[prop]);
                                        }
                                        swagger.show("<br/>");
                                    }
                                }
                                swagger.ensureAllPropertiesExist(firstObject);
                            }
                        }
                    };
                }
                return SwaggerValidator;
            })();
            exports_1("SwaggerValidator", SwaggerValidator);
        }
    }
});
//# sourceMappingURL=app.swagger.validation.js.map