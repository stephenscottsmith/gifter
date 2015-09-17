var Requester = require('../requester/Requester'),
    expect = require('chai').expect,
    mocha = require('mocha'),
    Suite = require('./LoginTestSuite'),
    tests = Suite.tests;

// TESTS TO ADD:
// 	1. DeviceID

var LoginTester = {
    test: function () {
    	describe('User Login Test Suite:', function () {
    		var CompletelyEmpty = tests.CompletelyEmpty;
    		it(CompletelyEmpty.description, function (done) {
    			var options = {
                    method: 'post',
                    body: CompletelyEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(CompletelyEmpty.expectedStatusCode);
                    expect(response.body).to.eql(CompletelyEmpty.expectedResponse);
                    done();
                });
    		}); 

    		var ExtraCredential = tests.ExtraCredential;
            it(ExtraCredential.description, function (done) {
                var options = {
                    method: 'post',
                    body: ExtraCredential.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(ExtraCredential.expectedStatusCode);
                    expect(response.body).to.eql(ExtraCredential.expectedResponse);
                    done();
                });
            });

            var UsernameEmpty = tests.UsernameEmpty;
            it(UsernameEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: UsernameEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(UsernameEmpty.expectedStatusCode);
                    expect(response.body).to.eql(UsernameEmpty.expectedResponse);
                    done();
                });
            });

            var UsernameNotEmail = tests.UsernameNotEmail;
            it(UsernameNotEmail.description, function (done) {
                var options = {
                    method: 'post',
                    body: UsernameNotEmail.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(UsernameNotEmail.expectedStatusCode);
                    expect(response.body).to.eql(UsernameNotEmail.expectedResponse);
                    done();
                });
            });

            var UsernameWithoutDomain = tests.UsernameWithoutDomain;
            it(UsernameWithoutDomain.description, function (done) {
                var options = {
                    method: 'post',
                    body: UsernameWithoutDomain.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(UsernameWithoutDomain.expectedStatusCode);
                    expect(response.body).to.eql(UsernameWithoutDomain.expectedResponse);
                    done();
                });
            });

            var UsernameWithoutAtSymbol = tests.UsernameWithoutAtSymbol;
            it(UsernameWithoutAtSymbol.description, function (done) {
                var options = {
                    method: 'post',
                    body: UsernameWithoutAtSymbol.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(UsernameWithoutAtSymbol.expectedStatusCode);
                    expect(response.body).to.eql(UsernameWithoutAtSymbol.expectedResponse);
                    done();
                });
            });

            var PasswordEmpty = tests.PasswordEmpty;
            it(PasswordEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: PasswordEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PasswordEmpty.expectedStatusCode);
                    expect(response.body).to.eql(PasswordEmpty.expectedResponse);
                    done();
                });
            });

            var PasswordTooShort = tests.PasswordTooShort;
            it(PasswordTooShort.description, function (done) {
                var options = {
                    method: 'post',
                    body: PasswordTooShort.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PasswordTooShort.expectedStatusCode);
                    expect(response.body).to.eql(PasswordTooShort.expectedResponse);
                    done();
                });
            });

            var PasswordTooLong = tests.PasswordTooLong;
            it(PasswordTooLong.description, function (done) {
                var options = {
                    method: 'post',
                    body: PasswordTooLong.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PasswordTooLong.expectedStatusCode);
                    expect(response.body).to.eql(PasswordTooLong.expectedResponse);
                    done();
                });
            });

            var DeviceIDEmpty = tests.DeviceIDEmpty;
            it(DeviceIDEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: DeviceIDEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(DeviceIDEmpty.expectedStatusCode);
                    expect(response.body).to.eql(DeviceIDEmpty.expectedResponse);
                    done();
                });
            });

            var UserDoesNotExist = tests.UserDoesNotExist;
            it(UserDoesNotExist.description, function (done) {
                var options = {
                    method: 'post',
                    body: UserDoesNotExist.body,
                    json: true,
                    url: 'http://localhost:8080/sessions'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(UserDoesNotExist.expectedStatusCode);
                    expect(response.body).to.eql(UserDoesNotExist.expectedResponse);
                    done();
                });
            });

            var IncorrectPassword = tests.IncorrectPassword;
            it(IncorrectPassword.description, function (done) {
            	var options = {
            		method: 'post',
            		body: IncorrectPassword.body,
            		json: true,
            		url:'http://localhost:8080/sessions'
            	};

            	Requester.request(options, function (response) {
            		expect(response.statusCode).to.equal(IncorrectPassword.expectedStatusCode);
            		expect(response.body).to.eql(IncorrectPassword.expectedResponse);
            		done();
            	});
            });

            var SuccessfulLogin = tests.SuccessfulLogin;
            it(SuccessfulLogin.description, function (done) {
            	var options = {
            		method: 'post',
            		body: SuccessfulLogin.body,
            		json: true,
            		url:'http://localhost:8080/sessions'
            	};

            	Requester.request(options, function (response) {
            		expect(response.statusCode).to.equal(SuccessfulLogin.expectedStatusCode);
            		expect(response.body.message).to.eql(SuccessfulLogin.expectedResponse.message);
            		expect(response.body).to.have.all.keys(SuccessfulLogin.responseKeys);
            		expect(response.body.token).to.not.be.undefined;
            		done();
            	});
            });

            var UserAlreadyLoggedIn = tests.UserAlreadyLoggedIn;
    		it(UserAlreadyLoggedIn.description, function () {
    			var options = {
    				method: 'post',
            		body: UserAlreadyLoggedIn.body,
            		json: true,
            		url:'http://localhost:8080/sessions'
    			};

    			Requester.request(options, function (response) {
    				expect(response.statusCode).to.equal(UserAlreadyLoggedIn.expectedStatusCode);
    				expect(response.body).to.eql(UserAlreadyLoggedIn.expectedResponse);
    				done();
    			});
    		});
    	});
    }
};

module.exports = LoginTester;
