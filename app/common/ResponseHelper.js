System.register([], function(exports_1) {
    var ResponseHelper;
    return {
        setters:[],
        execute: function() {
            ResponseHelper = (function () {
                function ResponseHelper() {
                }
                ResponseHelper.PrettyfieResponse = function (response) {
                    if (typeof response === 'string') {
                        response = ResponseHelper.TryParseToObject(response);
                    }
                    if (response.responseJSON) {
                        if (response.responseText) {
                            delete response.responseText;
                        }
                        if (response.responseJSON.message) {
                            response.responseJSON.message = ResponseHelper.TryParseToObject(response.responseJSON.message);
                        }
                    }
                    return JSON.stringify(response, null, 4);
                };
                ResponseHelper.TryParseToObject = function (response) {
                    var result;
                    try {
                        result = JSON.parse(response);
                    }
                    catch (e) {
                        return response;
                    }
                    return result;
                };
                return ResponseHelper;
            })();
            exports_1("ResponseHelper", ResponseHelper);
        }
    }
});
//# sourceMappingURL=ResponseHelper.js.map