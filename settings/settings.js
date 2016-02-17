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

(function(app){
  'use strict';
  app.settings = function () {

    var uname = "valid.user"; // Change To username
    var pword = "nnIZcFYT1!"; // Change To Default Password
    var dmain = "KIT75519";   // Change to Domain Name, use '.'for local machine
    var full = function () {
      return dmain + "\\" + uname;
    };

    var _host = 'http://localhost'; // You may need to change this if you aren't hosting the webservice locally
    var _basePath = '/Lwb.Cirts.WebService/api/'; // You "may" need to change this if hosting on another machine

    return {
      username: uname,
      password: pword,
      domain: dmain,
      fullUserName: full,
      host: _host,
      basePath: _basePath,
      apiId: "test_1", // You may need to change this if you are testing with another key
      apiKey: "MQpE1iRhe3jPfNQL/CIoRg==" // You may need to change this if you are testing with another key
    };
  }();

}(window.app || (window.app = {})));