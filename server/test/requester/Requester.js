var request = require('request');

var Requester = {
    request: function (options, callback) {
        request(options, function (err, res, body) {
            callback(res);
        });
    }
};

module.exports = Requester;

