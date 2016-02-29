System.register([], function(exports_1) {
    var HtmlHelper;
    return {
        setters:[],
        execute: function() {
            HtmlHelper = (function () {
                function HtmlHelper() {
                }
                HtmlHelper.parseQuery = function (q) {
                    if (!q)
                        return q;
                    q = q.replace(/\?/g, ""); //Ensure only one ? otherwise breaks query(jQuery is poo)
                    q = "?" + q;
                    return q;
                };
                HtmlHelper.parseEndpoint = function (endpoint, uriParams) {
                    if (!endpoint)
                        return "";
                    endpoint = endpoint.slice(1);
                    if (typeof endpoint !== "string")
                        return "";
                    return endpoint.replace(/\{.*\}/g, uriParams || "/");
                };
                HtmlHelper.build = function (endpoint, query) {
                    return endpoint + (query || "");
                };
                return HtmlHelper;
            })();
            exports_1("HtmlHelper", HtmlHelper);
        }
    }
});
//# sourceMappingURL=HtmlHelper.js.map