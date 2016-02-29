System.register(["../settings/settings"], function(exports_1) {
    var settings_1;
    var CirtsClient;
    return {
        setters:[
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            CirtsClient = (function () {
                function CirtsClient(settings) {
                    this.settings = settings || (new settings_1.AppSettings());
                }
                CirtsClient.prototype.httpGet = function (resource, success, fail, params, output) {
                    this.call('GET', resource, null, success, fail, params, output);
                };
                ;
                CirtsClient.prototype.post = function (resource, content, success, fail, params, output) {
                    this.call('POST', resource, content, success, fail, params, output);
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
                CirtsClient.generateId = function (len) {
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
                CirtsClient.prototype.call = function (method, resource, contents, success, fail, params, output) {
                    var contentString = (contents ? JSON.stringify(contents) : null);
                    var client = this;
                    var nonce = CirtsClient.generateId();
                    jQuery.ajax(this.settings.host + this.settings.basePath + resource, {
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
                        if (output) {
                            output.successDo(r);
                        }
                    })
                        .fail(function (r) {
                        fail(r);
                        if (output) {
                            output.successDo(r);
                        }
                    });
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
//# sourceMappingURL=cirts-client.js.map