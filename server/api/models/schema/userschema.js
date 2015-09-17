var Joi = require('joi'),
    Phone = require('phone'),
    JoiPhone = require("joi-phone");

var UserSchema = Joi.object().keys({
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(40).required(),
    username: Joi.string().email({errorLevel: 0, tldWhiteList: ['com', 'org', 'io', 'net', 'gov']}).required(),
    password: Joi.string().min(6).max(64).required(),
    confirm_password: Joi.string().min(6).max(64).required(),
    country_code: Joi.string().min(2).max(3).required(), 
    phone_number: JoiPhone.e164().required(),
    birth_date: Joi.date().min('01/01/1900').format('MM/DD/YYYY').required()
}).unknown(false);

module.exports = UserSchema;