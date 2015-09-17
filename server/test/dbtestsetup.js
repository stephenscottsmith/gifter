var Neo = require('node-neo4j'),
    Config = require('config'),
    dbauthtoken = Config.get('Database-Server.auth_token'),
    dbhost = Config.get('Database-Server.host'),
	dbport = Config.get('Database-Server.port'),
    db = new Neo('http://:' + dbauthtoken + '@' + dbhost + ':' + dbport),
    Api = require('../api/api'),
    expect = require('chai').expect,
    mocha = require('mocha'),
    Req = require('./requester/requester');

var Dbtestsetup = {
    Wipe: function () {
        describe('Wiping the database:', function () {
            it('Removing all of the nodes with relationships...', function (done) {
                db.cypherQuery('MATCH (n)-[r]->(s) DELETE n, r, s', function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    done();
                });   
            });

            it('Removing all of the single nodes...', function (done) {
                db.cypherQuery('MATCH (n) DELETE n', function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    done();
                });   
            });

            it('Creating constraint on username property of :USER nodes...', function (done) {
                db.cypherQuery('CREATE CONSTRAINT ON (user:USER) ASSERT user.username IS UNIQUE', function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    done();
                });
            });

            it('Creating constraint on id property of :SESSION nodes...', function (done) {
                db.cypherQuery('CREATE CONSTRAINT ON (session:SESSION) ASSERT session.token IS UNIQUE', function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    done();
                });
            });
        });
    },
    CreateTestData: function () {
        describe('Creating Users...', function () {
            var RogerVega = {
                    first_name: 'Roger',
                    last_name: 'Vega',
                    username: 'rogervega@gmail.com',
                    password: 'password',
                    confirm_password: 'password',
                    country_code: 'USA',
                    phone_number: '+15555555555',
                    birth_date: '01/02/1990'
                },
                RogerVegaResponse = {
                    "statusCode": 200,
                    "message": "Successfully signed up new user: rogervega@gmail.com",
                    "username": 'rogervega@gmail.com' 
                },
                ChrisWeller = {
                    first_name: 'Chris',
                    last_name: 'Weller',
                    username: 'chrisweller@gmail.com',
                    password: 'password',
                    confirm_password: 'password',
                    country_code: 'USA',
                    phone_number: '+15555555555',
                    birth_date: '01/02/1990'
                },
                ChrisWellerResponse = {
                    "statusCode": 200,
                    "message": "Successfully signed up new user: chrisweller@gmail.com",
                    "username": 'chrisweller@gmail.com' 
                },
                DerekRudd = {
                    first_name: 'Derek',
                    last_name: 'Rudd',
                    username: 'derekrudd@gmail.com',
                    password: 'password',
                    confirm_password: 'password',
                    country_code: 'USA',
                    phone_number: '+15555555555',
                    birth_date: '01/02/1990'
                },
                DerekRuddResponse = {
                    "statusCode": 200,
                    "message": "Successfully signed up new user: derekrudd@gmail.com",
                    "username": 'derekrudd@gmail.com' 
                };

            it('Creating Roger Vega...', function (done) {
                var options = {
                    method: 'post',
                    body: RogerVega,
                    json: true,
                    url:'http://localhost:8080/signup'
                };

                Req.request(options, function (response) {
                    expect(response.statusCode).to.equal(200);
                    expect(response.body).to.eql(RogerVegaResponse);
                    done();
                });
            });

            it('Creating Chris Weller...', function (done) {
                var options = {
                    method: 'post',
                    body: ChrisWeller,
                    json: true,
                    url:'http://localhost:8080/signup'
                };

                Req.request(options, function (response) {
                    expect(response.statusCode).to.equal(200);
                    expect(response.body).to.eql(ChrisWellerResponse);
                    done();
                });
            });

            it('Creating Derek Rudd...', function (done) {
                var options = {
                    method: 'post',
                    body: DerekRudd,
                    json: true,
                    url:'http://localhost:8080/signup'
                };

                Req.request(options, function (response) {
                    expect(response.statusCode).to.equal(200);
                    expect(response.body).to.eql(DerekRuddResponse);
                    done();
                });
            });
        });
    },
    LoginChrisWeller: function () {
        var ChrisWellerLogin = {
            username: 'chrisweller@gmail.com',
            password: 'password',
            deviceID: '88'
        };

        describe('Logging in users...', function () {
            it('Logging in Chris Weller...', function (done) {
                var options = {
                    method: 'post',
                    body: ChrisWellerLogin,
                    json: true,
                    url:'http://localhost:8080/sessions'
                };

                Req.request(options, function (response) {
                    expect(response.statusCode).to.equal(201);
                    done();
                });
            });
        });
    }
};

module.exports = Dbtestsetup;