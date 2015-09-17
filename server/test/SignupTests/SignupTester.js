var Requester = require('../requester/Requester'),
    expect = require('chai').expect,
    mocha = require('mocha'),
    Suite = require('./SignupTestSuite'),
    tests = Suite.tests;

// TESTS TO ADD:
//     1. Invalid country_code (as in not in the list of country codes)

var SignupTester = {
    test: function () {
        describe('User Signup Test Suite:', function () {

            var CompletelyEmpty = tests.CompletelyEmpty;
            it(CompletelyEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: CompletelyEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
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
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(ExtraCredential.expectedStatusCode);
                    expect(response.body).to.eql(ExtraCredential.expectedResponse);
                    done();
                });
            });

            var FirstNameEmpty = tests.FirstNameEmpty;
            it(FirstNameEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: FirstNameEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(FirstNameEmpty.expectedStatusCode);
                    expect(response.body).to.eql(FirstNameEmpty.expectedResponse);
                    done();
                });
            });

            var FirstNameTooShort = tests.FirstNameTooShort;
            it(FirstNameTooShort.description, function (done) {
                var options = {
                    method: 'post',
                    body: FirstNameTooShort.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(FirstNameTooShort.expectedStatusCode);
                    expect(response.body).to.eql(FirstNameTooShort.expectedResponse);
                    done();
                });
            });

            var FirstNameTooLong = tests.FirstNameTooLong;
            it(FirstNameTooLong.description, function (done) {
                var options = {
                    method: 'post',
                    body: FirstNameTooLong.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(FirstNameTooLong.expectedStatusCode);
                    expect(response.body).to.eql(FirstNameTooLong.expectedResponse);
                    done();
                });
            });

            var LastNameEmpty = tests.LastNameEmpty;
            it(LastNameEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: LastNameEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(LastNameEmpty.expectedStatusCode);
                    expect(response.body).to.eql(LastNameEmpty.expectedResponse);
                    done();
                });
            });

            var LastNameTooShort = tests.LastNameTooShort;
            it(LastNameTooShort.description, function (done) {
                var options = {
                    method: 'post',
                    body: LastNameTooShort.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(LastNameTooShort.expectedStatusCode);
                    expect(response.body).to.eql(LastNameTooShort.expectedResponse);
                    done();
                });
            });
     
            var LastNameTooLong = tests.LastNameTooLong;
            it(LastNameTooLong.description, function (done) {
                var options = {
                    method: 'post',
                    body: LastNameTooLong.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(LastNameTooLong.expectedStatusCode);
                    expect(response.body).to.eql(LastNameTooLong.expectedResponse);
                    done();
                });
            });

            var UsernameEmpty = tests.UsernameEmpty;
            it(UsernameEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: UsernameEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
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
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(UsernameNotEmail.expectedStatusCode);
                    expect(response.body).to.eql(UsernameNotEmail.expectedResponse);
                });done();
            });

            var UsernameWithoutDomain = tests.UsernameWithoutDomain;
            it(UsernameWithoutDomain.description, function (done) {
                var options = {
                    method: 'post',
                    body: UsernameWithoutDomain.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
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
                    url: 'http://localhost:8080/signup'
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
                    url: 'http://localhost:8080/signup'
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
                    url: 'http://localhost:8080/signup'
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
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PasswordTooLong.expectedStatusCode);
                    expect(response.body).to.eql(PasswordTooLong.expectedResponse);
                    done();
                });
            });

            var ConfirmPasswordEmpty = tests.ConfirmPasswordEmpty;
            it(ConfirmPasswordEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: ConfirmPasswordEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(ConfirmPasswordEmpty.expectedStatusCode);
                    expect(response.body).to.eql(ConfirmPasswordEmpty.expectedResponse);
                });done();
            });

            var ConfirmPasswordTooShort = tests.ConfirmPasswordTooShort;
            it(ConfirmPasswordTooShort.description, function (done) {
                var options = {
                    method: 'post',
                    body: ConfirmPasswordTooShort.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };
                // GETTING BUSTED HERE AND PasswordTooShort (try changing expectedStatCode)
                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(ConfirmPasswordTooShort.expectedStatusCode);
                    expect(response.body).to.eql(ConfirmPasswordTooShort.expectedResponse);
                    done();
                });
            });

            var ConfirmPasswordTooLong = tests.ConfirmPasswordTooLong;
            it(ConfirmPasswordTooLong.description, function (done) {
                var options = {
                    method: 'post',
                    body: ConfirmPasswordTooLong.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(ConfirmPasswordTooLong.expectedStatusCode);
                    expect(response.body).to.eql(ConfirmPasswordTooLong.expectedResponse);
                    done();
                });
            });

            var PasswordsNotEqual = tests.PasswordsNotEqual;
            it(PasswordsNotEqual.description, function (done) {
                var options = {
                    method: 'post',
                    body: PasswordsNotEqual.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PasswordsNotEqual.expectedStatusCode);
                    expect(response.body).to.eql(PasswordsNotEqual.expectedResponse);
                    done();
                });
            });

            var CountryCodeEmpty = tests.CountryCodeEmpty;
            it(CountryCodeEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: CountryCodeEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(CountryCodeEmpty.expectedStatusCode);
                    expect(response.body).to.eql(CountryCodeEmpty.expectedResponse);
                });done();
            });

            var CountryCodeTooShort = tests.CountryCodeTooShort;
            it(CountryCodeTooShort.description, function (done) {
                var options = {
                    method: 'post',
                    body: CountryCodeTooShort.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };
                // GETTING BUSTED HERE AND PasswordTooShort (try changing expectedStatCode)
                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(CountryCodeTooShort.expectedStatusCode);
                    expect(response.body).to.eql(CountryCodeTooShort.expectedResponse);
                    done();
                });
            });

            var CountryCodeTooLong = tests.CountryCodeTooLong;
            it(CountryCodeTooLong.description, function (done) {
                var options = {
                    method: 'post',
                    body: CountryCodeTooLong.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(CountryCodeTooLong.expectedStatusCode);
                    expect(response.body).to.eql(CountryCodeTooLong.expectedResponse);
                    done();
                });
            });

            var PhoneNumberEmpty = tests.PhoneNumberEmpty;
            it(PhoneNumberEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: PhoneNumberEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PhoneNumberEmpty.expectedStatusCode);
                    expect(response.body).to.eql(PhoneNumberEmpty.expectedResponse);
                });done();
            });

            var PhoneNumberMissingPlusSymbol = tests.PhoneNumberMissingPlusSymbol;
            it(PhoneNumberMissingPlusSymbol.description, function (done) {
                var options = {
                    method: 'post',
                    body: PhoneNumberMissingPlusSymbol.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };
                // GETTING BUSTED HERE AND PasswordTooShort (try changing expectedStatCode)
                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PhoneNumberMissingPlusSymbol.expectedStatusCode);
                    expect(response.body).to.eql(PhoneNumberMissingPlusSymbol.expectedResponse);
                    done();
                });
            });

            var PhoneNumberContainsDashes = tests.PhoneNumberContainsDashes;
            it(PhoneNumberContainsDashes.description, function (done) {
                var options = {
                    method: 'post',
                    body: PhoneNumberContainsDashes.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PhoneNumberContainsDashes.expectedStatusCode);
                    expect(response.body).to.eql(PhoneNumberContainsDashes.expectedResponse);
                    done();
                });
            });

            var PhoneNumberContainsInvalidCharacters = tests.PhoneNumberContainsInvalidCharacters;
            it(PhoneNumberContainsInvalidCharacters.description, function (done) {
                var options = {
                    method: 'post',
                    body: PhoneNumberContainsInvalidCharacters.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(PhoneNumberContainsInvalidCharacters.expectedStatusCode);
                    expect(response.body).to.eql(PhoneNumberContainsInvalidCharacters.expectedResponse);
                    done();
                });
            });

            var BirthDateEmpty = tests.BirthDateEmpty;
            it(BirthDateEmpty.description, function (done) {
                var options = {
                    method: 'post',
                    body: BirthDateEmpty.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(BirthDateEmpty.expectedStatusCode);
                    expect(response.body).to.eql(BirthDateEmpty.expectedResponse);
                    done();
                });
            });

            var BirthDateNotFormattedCorrectly = tests.BirthDateNotFormattedCorrectly;
            it(BirthDateNotFormattedCorrectly.description, function (done) {
                var options = {
                    method: 'post',
                    body: BirthDateNotFormattedCorrectly.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(BirthDateNotFormattedCorrectly.expectedStatusCode);
                    expect(response.body).to.eql(BirthDateNotFormattedCorrectly.expectedResponse);
                    done();
                });
            });

            var BirthDateTooOld = tests.BirthDateTooOld;
            it(BirthDateTooOld.description, function (done) {
                var options = {
                    method: 'post',
                    body: BirthDateTooOld.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(BirthDateTooOld.expectedStatusCode);
                    expect(response.body).to.eql(BirthDateTooOld.expectedResponse);
                    done();
                });
            });

            var BirthDateTooYoung = tests.BirthDateTooYoung;
            it(BirthDateTooYoung.description, function (done) {
                var options = {
                    method: 'post',
                    body: BirthDateTooYoung.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(BirthDateTooYoung.expectedStatusCode);
                    expect(response.body).to.eql(BirthDateTooYoung.expectedResponse);
                    done();
                });
            });

            var SuccessfulPost = tests.SuccessfulPost;
            it(SuccessfulPost.description, function (done) {
                var options = {
                    method: 'post',
                    body: SuccessfulPost.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(200);
                    expect(response.body).to.eql(SuccessfulPost.expectedResponse);
                    done();
                });
            });

            var RePostingOfPreviousSuccessfulPost = tests.RePostingOfPreviousSuccessfulPost;
            it(RePostingOfPreviousSuccessfulPost.description, function (done) {
                var options = {
                    method: 'post',
                    body: RePostingOfPreviousSuccessfulPost.body,
                    json: true,
                    url: 'http://localhost:8080/signup'
                };

                Requester.request(options, function (response) {
                    expect(response.statusCode).to.equal(409);
                    expect(response.body).to.eql(RePostingOfPreviousSuccessfulPost.expectedResponse);
                    done();
                });
            });
        });
    }
};

module.exports = SignupTester;