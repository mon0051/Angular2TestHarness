System.register(["../settings/settings", 'jquery'], function(exports_1) {
    var settings_1, jQuery;
    var CirtsClient;
    return {
        setters:[
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (jQuery_1) {
                jQuery = jQuery_1;
            }],
        execute: function() {
            CirtsClient = (function () {
                function CirtsClient() {
                    this.settings = new settings_1.AppSettings();
                }
                CirtsClient.prototype.httpGet = function (resource, success, fail, params) {
                    this.call('GET', resource, null, success, fail, params);
                };
                ;
                CirtsClient.prototype.post = function (resource, content, success, fail, params) {
                    this.call('POST', resource, content, success, fail, params);
                };
                ;
                CirtsClient.prototype.hash = function (method, resource, timestamp, nonce, contents, params) {
                    var sig = this.signature(method, resource, timestamp, nonce, contents, params);
                    var sha = new jsSHA('SHA-256', 'TEXT'); //jshint ignore:line, this is a library
                    sha.setHMACKey('MQpE1iRhe3jPfNQL/CIoRg==', 'B64');
                    sha.update(sig);
                    return sha.getHMAC('B64');
                };
                ;
                CirtsClient.prototype.generateId = function (len) {
                    var p = this.settings;
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
                ;
                CirtsClient.prototype.call = function (method, resource, contents, success, fail, params) {
                    var contentString = (contents ? JSON.stringify(contents) : null);
                    var nonce = this.generateId();
                    jQuery.ajax(this.settings.host + this.settings.basePath + resource, {
                        method: method,
                        contentType: 'application/json',
                        data: contentString,
                        dataType: 'json',
                        url: this.settings.basePath + resource + params,
                        beforeSend: function (xhr) {
                            var timestampString = new Date().toGMTString();
                            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.settings.username + ':' + this.settings.password));
                            xhr.setRequestHeader('X-Api-Key', this.settings.apiId + ':' + this.hash(method, resource, timestampString, nonce, contentString));
                            xhr.setRequestHeader('X-Timestamp', timestampString);
                            xhr.setRequestHeader('X-Nonce', nonce);
                        }
                    })
                        .done(success)
                        .fail(fail);
                };
                ;
                CirtsClient.prototype.signature = function (method, resource, timestamp, nonce, contents, params) {
                    // todo: query params
                    // /Lwb.Cirts.WebService/api/Ping
                    // Mon, 15 Jun 2015 04:01:00 GMT
                    var signature = method + '\n' + this.settings.basePath + resource + '\n' + timestamp + '\n' + nonce + '\n';
                    if (contents) {
                        signature = signature + contents + '\n';
                    }
                    return signature;
                };
                ;
                return CirtsClient;
            })();
            exports_1("CirtsClient", CirtsClient);
        }
    }
});
//# sourceMappingURL=app.cirts-client.js.map