var Joi = require('joi');

var LoginSchema = Joi.object().keys({
    username: Joi.string().email({errorLevel: 0, tldWhiteList: ['com', 'org', 'io', 'net', 'gov']}).required(),
    password: Joi.string().min(6).max(64).required(),
    deviceID: Joi.number().integer().required() // This will most likely change once we determine the apple device UID's format
}).unknown(false);

module.exports = LoginSchema;