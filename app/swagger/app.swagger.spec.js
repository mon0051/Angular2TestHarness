System.register([], function(exports_1) {
    var SwaggerSpec;
    return {
        setters:[],
        execute: function() {
            SwaggerSpec = (function () {
                function SwaggerSpec() {
                    this.spec = { "swagger": "2.0", "info": { "version": "0.0.6", "title": "LWB CIRTS API" }, "paths": { "/clients": { "get": { "description": "Will take a number of parameters, search the CIRTS database, and\nreturn a list of clients that match the given parameters.\n\n**Important!**\n\nA query must have at least one of the following parameters provided to be a valid query.\n1. GivenNames (At least 3 characters, will match on partial) _This will also search aliases_\n2. FamilyName (At least 3 characters, will match on partial)\n3. CirtsId (Will match exact only, so provide full id if using)\n\nOnly one LWBLocation can be searched at once, defaulting to Australia. **If you do not provide an LwbLocation only results from Australia will be returned.**\n\n#### Example Usage ####\n\nGiven that the database contains the following **client** data\n\n| cirtsID | firstName | familyName | dateOfBirth | lwbRegion |\n| --- | --- | ---|\n| 00001 | Jane | Doe | 19800101 | Parramatta |\n| 00002 | John | Doe | 19820202 | Bankstown |\n| 00003 | Joe | Bloggs | 19991231 | Surry Hills |\n\nThe following example behaviour is expected . . .\n\n#### Search by CirtsID, matching clients found ####\n\n| Request URL | Expected Response Code |\n| ------ |\n| /clients?familyName=Doe | 200 OK |\n\n```javascript\n{\n  client: [\n    { cirtsID: \"00001\", firstName: \"Jane\", familyName: \"Doe\",  dateOfBirth: \"1980-01-01T00:00:00.000Z\", lwbRegion: \"Parramatta\" },\n    { cirtsID: \"00002\", firstName: \"John\", familyName: \"Doe\", dateOfBirth: \"1982-02-02T00:00:00.000Z\", lwbRegion: \"Bankstown\" }\n  ]\n}\n```\n\n#### Search by CirtsID, matching clients NOT found ####\n\n| Request URL | Expected Response Code |\n| ------ |\n| /clients?familyName=Smith | 200 OK |\n\n```javascript\n{\n  client: [\n  ]\n}\n```\n", "parameters": [{ "name": "cirtsId", "in": "query", "description": "The CirtsId of the client you are searching for. You can expect to only get one result if this is specified correctly. Format is CLXXXXX\n", "required": false, "type": "string", "format": "CLXXXXX" }, { "name": "givenNames", "in": "query", "description": "The given name/s of the client/s you are searching for. Seperate names by a space. If the client is only or primarily know by a nickname, they may have an alias saved in their personal details. This parameter will also return results where it matchs the clients alias.\n", "required": false, "type": "string", "format": "text" }, { "name": "familyName", "in": "query", "description": "The family name of the client. Not all clients have a provided family name, these records\nhave a family name with an empty string or whitespace as value, which is not the same as a null value.\n", "required": false, "type": "string", "format": "text" }, { "name": "lwbLocation", "in": "query", "description": "The LWB location the client is associated with. This is normally a Country. Do not specify abbreviated names eg. USA\nas they are not stored in the database and will yeild no responses.\n", "required": false, "type": "string", "format": "text" }, { "name": "lwbRegion", "in": "query", "description": "Associated LWB Region that is associated with the client. Regions are (Usually) contained inside a State. Provide full name of region eg. \"Far North Coast\"\n", "required": false, "type": "string", "format": "text" }, { "name": "state", "in": "query", "description": "Associate State or Teritory associated with the client. Provide in abbreviated form eg. NSW, VIC etc. Full names of states are not saved in the database\nand will not return results if used.\n", "required": false, "type": "string", "format": "text" }, { "name": "sector", "in": "query", "description": "Sector of the LWB organisation Associated with this client. eg. \"Mental Health\", \"Disability\"\n", "required": false, "type": "string", "format": "text" }, { "name": "active", "in": "query", "description": "Flag that specifies if the client/s returned are in current caseload\n", "required": false, "type": "boolean" }, { "name": "dateOfBirthLow", "in": "query", "description": "Lowest dateOfBirth to be returned in search results.\n", "required": false, "type": "string", "format": "YYYYMMDD" }, { "name": "dateOfBirthHigh", "in": "query", "description": "Maximum dateOfBirth to be returned in search results.\n", "required": false, "type": "string", "format": "YYYYMMDD" }, { "name": "gender", "in": "query", "description": "'Client gender. Valid inputs are Male, Female, Unknown, None, Other'. None is the default and will return results from any gender.\n", "required": false, "type": "string", "format": "text" }], "responses": { "200": { "description": "Successful response", "schema": { "title": "clients", "type": "array", "items": { "title": "Client", "type": "object", "properties": { "givenNames": { "type": "string", "description": "The Clients given name\n" }, "familyName": { "type": "string", "description": "Clients family name. Equivilent to surname, second name\n" }, "cirtsId": { "type": "string", "format": "CLXXXXX", "description": "The CirtsId of the client\n" }, "dateOfBirth": { "type": "string", "format": "YYYYMMDD", "description": "Will always be returned in this format. Manipulation client side is trivial to display in other formats.\n" }, "lwbRegion": { "type": "string", "description": "The region from which LWB provides services to the client\n" } } } } }, "400": { "description": "Malformed Request Provided", "schema": { "$ref": "#/definitions/BadRequest" } }, "403": { "description": "Forbidden", "schema": { "$ref": "#/definitions/ForbiddenError" } }, "404": { "description": "Not Found", "schema": { "$ref": "#/definitions/NotFoundError" } }, "500": { "description": "Server Error", "schema": { "$ref": "#/definitions/ServerError" } } } } }, "/clients/{cirtsId}": { "get": { "description": "Takes a CirtsId and provides details on one specific client\n", "parameters": [{ "name": "cirtsId", "in": "path", "description": "Client CirtsId. Must be provided with alphabetic prefix. eg. CL1000 is valid 1000 is not valid.\n", "type": "string", "required": true, "format": "CLXXXXX" }], "responses": { "200": { "description": "Successful response. Will contain detail on one client.\n", "schema": { "title": "client", "type": "object", "properties": { "cirtsId": { "type": "string", "format": "CLXXXXXX,", "description": "The CirtsId of the client in question. Will be in the format CLXXXX\n" }, "givenNames": { "type": "string", "format": "text", "description": "Also known as given name/s. May be more than one, but will be returned as single string.\n" }, "familyName": { "type": "string", "format": "text", "description": "May not exist. Equivilent to Surname, Second Name.\n" }, "alias": { "type": "string", "format": "text", "description": "If client is known primarily by a nickname, an alias may be provided\n" }, "dateOfBirth": { "type": "string", "format": "YYYYMMDD", "description": "Age can be calculated using this value. May be an estimate.\n" }, "primaryLanguage": { "type": "string", "description": "The primary language spoken by the client\n" }, "indigenousStatus": { "type": "string", "description": "Will specify what kind of indigenous status client has, or none.\n" }, "phoneNumber": { "type": "string", "description": "As phone numbers are often given with brackets and non-numerical prefixes, this is a string and not a number as might be expected.\n" }, "primaryServiceType": { "type": "string", "description": "The Primary service that is provided by LWB to the client\n" }, "medicare": { "type": "string", "description": "The Medicare status of the client. Can be a number of predefined values.\n" }, "lwbStatus": { "type": "boolean", "description": "True is client is currently active\n" }, "lwbRegion": { "type": "string", "description": "Associated LWB region of client. Regions are contained in States.\n" } } } }, "400": { "description": "Malformed Request Provided", "schema": { "$ref": "#/definitions/BadRequest" } }, "403": { "description": "Forbidden", "schema": { "$ref": "#/definitions/ForbiddenError" } }, "404": { "description": "Not Found", "schema": { "$ref": "#/definitions/NotFoundError" } }, "500": { "description": "Server Error", "schema": { "$ref": "#/definitions/ServerError" } } } } }, "/clients/{cirtsId}/sector": { "get": { "description": "Takes a CirtsId and provides a list of sectors related to the client\n", "parameters": [{ "name": "cirtsId", "in": "path", "description": "Client CirtsId. Must be provided with alphabetic prefix. eg. CL1000 is valid 1000 is not valid.\n", "type": "string", "required": true, "format": "CLXXXX" }], "responses": { "200": { "description": "List of sectors client is associated with\n", "schema": { "title": "clientSectors", "type": "array", "items": { "type": "object", "properties": { "name": { "type": "string", "description": "Name of client sector\n" } } } } }, "400": { "description": "Malformed Request Provided", "schema": { "$ref": "#/definitions/BadRequest" } }, "403": { "description": "Forbidden", "schema": { "$ref": "#/definitions/ForbiddenError" } }, "404": { "description": "Not Found", "schema": { "$ref": "#/definitions/NotFoundError" } }, "500": { "description": "Server Error", "schema": { "$ref": "#/definitions/ServerError" } } } } }, "/clients/{cirtsId}/keyWorker": { "get": { "parameters": [{ "name": "cirtsId", "in": "path", "description": "Client CirtsId. Must be provided with alphabetic prefix. eg. CL1000 is valid 1000 is not valid.\n", "type": "string", "required": true, "format": "CLXXXX" }], "responses": { "200": { "description": "Key Worker associated with given client\n", "schema": { "title": "KeyWorker", "type": "object", "properties": { "givenNames": { "type": "string", "description": "Given Names of the worker\n" }, "familyName": { "type": "string", "description": "Family name of the Worker\n" }, "keyWorkerId": { "type": "string", "format": "WXXXXX" } } } }, "400": { "description": "Malformed Request Provided", "schema": { "$ref": "#/definitions/BadRequest" } }, "403": { "description": "Forbidden", "schema": { "$ref": "#/definitions/ForbiddenError" } }, "404": { "description": "Not Found", "schema": { "$ref": "#/definitions/NotFoundError" } }, "500": { "description": "Server Error", "schema": { "$ref": "#/definitions/ServerError" } } } } } }, "definitions": { "ServerError": { "description": "Default Server Error Message, returned when it does not meet the requirements for other\nmessages. Will probably contain an exception, and as such, should not be provided to unauthenticated\nusers. The default message for an unauthenticated request is 404 Not Found ( Good Security Practice )\n", "type": "object", "properties": { "message": { "type": "string", "default": "An unknown error has occured" }, "code": { "type": "integer", "default": 500 } } }, "NotFoundError": { "description": "Returned when a resource was not found, or a request has no authentication.\nIn the case of an actual resource not found, this will contain more specific information.\n", "type": "object", "properties": { "message": { "type": "string", "default": "The resource you are looking for could not be found.\n", "description": "This will contain information specific\nto each api if the request is authenticated, otherwise just a generic message.\n" }, "code": { "type": "integer", "default": 404 } } }, "ForbiddenError": { "description": "A request has CIRTS permissions, but not the expected permissions for the given resource.\nThis response is distinguised from the 404 Not Found in that can provide hints to a resolution.\n", "type": "object", "properties": { "message": { "type": "string", "default": "You do not have access to the resource you have requested. Ensure you are using the correct username\nand password, or contact the helpdesk if you believe you should have access to this resource.\n" }, "code": { "type": "integer", "default": 403 } } }, "BadRequest": { "description": "The request was not in the format expected. Either a required parameter was missing, an\nunexpected parameter was provided, of a paramter/s was not the correct value.\n", "type": "object", "properties": { "message": { "type": "string", "description": "Here details will be provided into which parameter/s was malformed. For example\n'Expected parameter \"cirtsId\" was not provided'\n" }, "code": { "type": "integer", "default": 400 } } } } };
                }
                return SwaggerSpec;
            })();
            exports_1("SwaggerSpec", SwaggerSpec);
        }
    }
});
//# sourceMappingURL=app.swagger.spec.js.map