var Joi = require('joi');

var GetSchema = Joi.object().keys({
    token: Joi.string()
}).unknown(false);

module.exports = GetSchema;