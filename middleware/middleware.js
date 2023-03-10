const { validationError } = require("../utils/messages");
const { signup, signin, updateData, resetPassword, permitData } = require("../validation/validator");

const signupValidate = (req, res, next) => {
    const result = signup.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(404).send(validationError);
    }
    else {
        console.log("ok");
        next();
    }
};

const signInValidate = (req, res, next) => {
    const result = signin.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(404).send(validationError);
    }
    else {
        console.log("ok");
        next();
    }
};

const profileUpdateValidate = (req, res, next) => {
    const result = updateData.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(404).send(validationError);
    }
    else {
        console.log("ok");
        next();
    }
};
const permissionValidation = (req, res, next) => {
    const result = permitData.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(404).send(validationError);
    }
    else {
        console.log("ok");
        next();
    }
};

const restUserPassword = (req, res, next) => {
    const result = resetPassword.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(404).send(validationError);
    }
    else {
        console.log("ok");
        next();
    }
};

module.exports = { signupValidate, signInValidate, permissionValidation, profileUpdateValidate ,restUserPassword};