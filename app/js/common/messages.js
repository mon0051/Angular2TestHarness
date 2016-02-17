window.app = window.app || {};

(function (messages) {

    messages.propertyWasNotExpected = function (p) {
        return (
        "<p class=\"text-error\"> Property "
        + p
        +
        " is not in swagger spec"
        + JSON.stringify(p)
        + "</p>");
    };

    messages.propertyWasExpected = function (p) {
        return (
        "<p class=\"text-success\">Property " +
        p +
        " was expected</p>");
    };

    messages.correctType = function (expected, actual) {
        return (
            "<p class=\"text-success\">ExpectedType " +
            expected +
            " got " +
            actual +
            "</p>"
        );
    };

    messages.incorrectType = function (expected, actual) {
        return (
            "<p class=\"text-error\">ExpectedType " +
            expected +
            " got " +
            actual +
            "</p>"
        );
    };

    messages.h4 = function (text) {
        return "<h4>" + text + "</h4>";
    };

}(window.app.messages || (window.app.messages = {})));
