///<reference path="app/cirts-client.js" />
///<reference path="lib/sha256.js" />
///<reference path="cirts.js" />

var validUsername = "valid.user";
var validPassword = "nnIZcFYT1!";
var validApiId = "test_1";
var validApiKey = "MQpE1iRhe3jPfNQL/CIoRg==";

describe("Ping", function () {
	beforeEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
		cirts.init(validApiId, validApiKey, validUsername, validPassword);
		done();
	});

	it("Handles GET", function (done) {
		cirts.get('ping', function (ping) {
			expect(ping.responseTime.substr(ping.responseTime.length - 2)).toBe('ms');
			done();
		}, function (response) {
			expect(response.responseJSON).toBeUndefined();
			done();
		});
	});

	it("Handles POST", function (done) {
		var request = {RequestText: 'Hello'};
		cirts.post('ping', request, function (ping) {
			expect(ping.responseTime.substr(ping.responseTime.length - 2)).toBe('ms');
			expect(ping.responseText).toBe('Hello');
			done();
		}, function (response) {
			expect(response.responseJSON).toBeUndefined();
			done();
		});
	});
});

describe("Client", function () {
	beforeEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
		cirts.init(validApiId, validApiKey, validUsername, validPassword);
		done();
	});

	it("Handles GET", function (done) {
		cirts.get('clients?familyName=Tubes', function (clients) {
			expect(clients).toNotBeNull();
			done();
		}, function (response) {
			expect(response.responseJSON).toBeNull();
			done();
		});
	});

	it("Handles GET", function (done) {
		cirts.get('clients/CL2015', function (client) {
			expect(client.cirtsId.toLowerCase()).toBe('CL2015');
			expect(client.personalDetails.givenNames).toBe("Omar")
			done();
		}, function (response) {
			expect(response.responseJSON).toBeNull();
			done();
		});
	});

});
