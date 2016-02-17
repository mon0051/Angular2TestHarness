var app = app;

window.app.extensions = {};

(function () {
  'use strict';

  app.extensions.isFunction = function (obj) {
    var getType = {};
    return obj && getType.toString.call(obj) === '[object Function]';
  };

  app.extensions.isNotFunction = function (obj) {
    return !app.extensions.isFunction(obj);
  };

}());