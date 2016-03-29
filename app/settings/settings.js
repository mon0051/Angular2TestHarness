/**
 * Created by andrew.monteith on 3/02/2016.
 *
 * You will need to change the username and password here for any automated tests to work
 * It is not advisable to enter the credentials for any "real" account here, although the
 * credentials will need to exist in the CIRTS database and on the machine in question.
 *
 * I advise that you create a testing account locally on the machine that hosts the
 * WebService, so that if any credentials are forgotten about in here, they will not be
 * useful harmful for external parties / harmful.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppSettings;
    return {
        setters:[],
        execute: function() {
            AppSettings = (function () {
                function AppSettings() {
                    this.username = "valid.user"; // Change To username
                    this.password = "nnIZcFYT1!"; // Change To Default Password
                    this.domain = "KIT75519"; // Change to Domain Name, use '.'for local machine
                    this.host = 'http://localhost'; // You may need to change this if you aren't hosting the webservice locally
                    this.basePath = '/Lwb.Cirts.WebService/api/'; // You "may" need to change this if hosting on another machine
                    this.apiId = "test_1";
                    this.apiKey = "MQpE1iRhe3jPfNQL/CIoRg==";
                }
                Object.defineProperty(AppSettings.prototype, "fullUserName", {
                    get: function () {
                        if (this.domain) {
                            return this.domain + "\\" + this.username;
                        }
                        return this.username;
                    },
                    set: function (value) {
                        if (value === value.replace('\\', '')) {
                            this.domain = "";
                            return;
                        }
                        this.domain = value.replace(/\\.*/g, "");
                        this.username = value.replace(/.*\\/g, "");
                    },
                    enumerable: true,
                    configurable: true
                });
                return AppSettings;
            }());
            exports_1("AppSettings", AppSettings);
        }
    }
});
//# sourceMappingURL=settings.js.map