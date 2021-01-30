// validation
const Joi = require('@hapi/joi');

const registerValidatation = data => {
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
return schema.validate(data);
};


const loginValidatation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
    };

module.exports.registerValidatation = registerValidatation; 
module.exports.loginValidatation = loginValidatation; 