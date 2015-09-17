var Hapi = require('hapi'),
	Neo = require('node-neo4j'),
    Config = require('config'),
    Good = require('good'),
    routes = require('./Routes/routes.js');

var dbport = Config.get('Database-Server.port'),
    dbauthtoken = Config.get('Database-Server.auth_token'),
	host = Config.get('Api-Server.host'),
	port = Config.get('Api-Server.port'),
    logToConsole = Config.get('Api-Server.logToConsole');

var showServerRunInfo = function () {
        console.log("Server started on %s:%s", host, port);
        console.log("Neo4j started on http://:%s@%s:%s", 
                     dbauthtoken, host, dbport);
    },
    connection = { 
        host: host,
        port: port 
    },
    register = {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                args:[{ log: '*', response: '*' }]
            }]
        }
    },
    registerCallback = function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }
    }, 
    server = function (connection, routes, logToConsole, register, registerCallback) {
        var hapi = new Hapi.Server();
        hapi.connection(connection);
        hapi.route(routes);
        if (logToConsole) {
            hapi.register(register, registerCallback);
        }
        return hapi;
    };

Gifter = server(connection, routes, logToConsole, register, registerCallback);
Gifter.start(showServerRunInfo); 

module.exports = Gifter;
