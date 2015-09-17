var Joi = require('joi');

var userCC = Joi.Object.keys({
    cc_type: ,
    cc_number: ,
    cc_expdate: ,
    cc_cvv: ,
    address_1: ,
    address_2: ,
    city: ,
    state: ,
    zip_code: 
});

exports.userCC = userCC;