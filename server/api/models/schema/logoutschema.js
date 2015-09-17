var Joi = require('joi');

var LogoutSchema = Joi.object().keys({
    token: Joi.string()
}).unknown(false);

module.exports = LogoutSchema;