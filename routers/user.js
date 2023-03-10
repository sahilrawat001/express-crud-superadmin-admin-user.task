const express = require("express");
const {  signUp,signIn } = require("../controller/main");
const { signupValidate, signInValidate } = require("../middleware/middleware");

const router = express.Router(); 
 
router.route("/signup").post(signupValidate, signUp);
router.route("/signin").post(signInValidate, signIn);
 

 

module.exports = router; 