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

export class AppSettings {
	username:string;
	password:string;
	domain:string;
	host:string;
	basePath:string;
	apiId:string;
	apiKey:string;

	fullUserName() {
		return this.domain + "\\" + this.username;
	}

	constructor() {
		this.username = "valid.user"; // Change To username
		this.password = "nnIZcFYT1!"; // Change To Default Password
		this.domain = "KIT75519";   // Change to Domain Name, use '.'for local machine

		this.host = 'http://localhost'; // You may need to change this if you aren't hosting the webservice locally
		this.basePath = '/Lwb.Cirts.WebService/api/'; // You "may" need to change this if hosting on another machine
		this.apiId = "test_1";
		this.apiKey = "MQpE1iRhe3jPfNQL/CIoRg==";
	}
}