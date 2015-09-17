var Joi = require('joi');

var FriendRequestSchema = Joi.object().keys({
    token: Joi.string(),
    username: Joi.string().email({errorLevel: 0, tldWhiteList: ['com', 'org', 'io', 'net', 'gov']}).required()
}).unknown(false);

module.exports = FriendRequestSchema;