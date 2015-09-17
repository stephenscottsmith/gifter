var Requester = require('./requester/Requester'),
    expect = require('chai').expect,
    mocha = require('mocha'),
    SignupTester = require('./SignupTests/SignupTester'),
    LoginTester = require('./LoginTests/LoginTester')
    Dbtestsetup = require('./Dbtestsetup');

describe('Gifter API Tests:', function () {
    Dbtestsetup.Wipe();
    SignupTester.test();
    Dbtestsetup.Wipe();
    Dbtestsetup.CreateTestData();
    // Dbtestsetup.LoginChrisWeller();
    LoginTester.test(); 
});