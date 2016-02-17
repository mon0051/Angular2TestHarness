var cirts = window.app.cirts = {};
var $ = jQuery; //jshint ignore:line

(function (o, settings) {
  'use strict';

    o.generateId = function(len) {
		return (Math.random().toString(36)+'0000000000000000').slice(2,16);
    };

    o.init = function (apiId, apiKey, username, password) {
        settings.apiId = apiId;
        settings.apiKey = apiKey;
        settings.username = username;
		    settings.password = password;

    };

    o.signature = function(method, resource, timestamp, nonce, contents, params) {
        // todo: query params
        // /Lwb.Cirts.WebService/api/Ping
        // Mon, 15 Jun 2015 04:01:00 GMT
        var signature = method + '\n' + settings.basePath + resource +'\n' + timestamp+'\n' + nonce + '\n';
        if (contents){
          signature = signature + contents + '\n';
        }

        return signature;
    };
    o.hash = function (method, resource, timestamp, nonce, contents, params) {
        var signature = o.signature(method, resource, timestamp, nonce, contents, params);
        var sha = new jsSHA('SHA-256', 'TEXT'); //jshint ignore:line, this is a library
        sha.setHMACKey('MQpE1iRhe3jPfNQL/CIoRg==', 'B64');
        sha.update(signature);
        return sha.getHMAC('B64');
    };

    o.call = function (method, resource, contents, success, fail, params) {
        var contentString = (contents ? JSON.stringify(contents) : null);
        var nonce = o.generateId();
        $.ajax(settings.host + settings.basePath + resource,
            {
                method: method,
                contentType: 'application/json',
                data: contentString,
                dataType: 'json',
                url: settings.baseUrl + resource + params,
                beforeSend:function(xhr) {
                    var timestampString = new Date().toGMTString();
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
                    xhr.setRequestHeader('X-Api-Key', settings.apiId + ':' + o.hash(method, resource, timestampString, nonce, contentString));
                    xhr.setRequestHeader('X-Timestamp', timestampString);
                    xhr.setRequestHeader('X-Nonce', nonce);
                }
            })
            .done(success)
            .fail(fail);
    };

    o.get = function (resource, success, fail,params) {
        o.call('GET', resource, null, success, fail,params);
    };
    o.post = function (resource, content, success, fail, params) {
        o.call('POST', resource, content, success, fail, params);
    };

})(cirts, window.app.cirtsSettings);