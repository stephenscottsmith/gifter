var Joi = require('joi');

var WishListSchema = Joi.object().keys({
    token: Joi.string().required(),
    wishlist_name: Joi.string().min(2).max(60).required()
}).unknown(false);

module.exports = WishListSchema;