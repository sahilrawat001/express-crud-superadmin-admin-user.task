const Joi = require("joi");



const signup = Joi.object().keys({
    name: Joi.string().min(4).required(),
    mail: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase().required(),
    password: Joi.string().regex(/^(?=.+\d)(?=.+[a-z])(?=.+[A-Z]).{6,20}$/).required(),
    role: Joi.string().valid("super", "admin","user").lowercase().required(),
    age: Joi.number().min(20).max(50).required(),
    permission:Joi.alternatives().conditional("role", {
        is: "super",
        then: Joi.array().items(Joi.string().valid("all")),
        otherwise:Joi.array().items(Joi.string().valid("get", "update"))
    })
   
});
 
const signin = Joi.object().keys({
    mail: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase(),
    password: Joi.string().regex(/^(?=.+\d)(?=.+[a-z])(?=.+[A-Z]).{6,20}$/),
});

const resetPassword = Joi.object().keys({
    password: Joi.string().regex(/^(?=.+\d)(?=.+[a-z])(?=.+[A-Z]).{6,20}$/).required(),
    newPassword: Joi.string().regex(/^(?=.+\d)(?=.+[a-z])(?=.+[A-Z]).{6,20}$/).required(), 
});

const updateData = Joi.object().keys({
    name: Joi.string().min(4),
    password: Joi.string().regex(/^(?=.+\d)(?=.+[a-z])(?=.+[A-Z]).{6,20}$/),
    age: Joi.number().min(20).max(50)
});

 
const permitData = Joi.object().keys({
    permission: Joi.string().required(),
});



module.exports = { signin, signup, updateData, resetPassword,permitData };