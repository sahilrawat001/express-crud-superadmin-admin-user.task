const express = require("express");
const { profileUpdate, resetPass, getUsers, updateUser, deleteUser, permitUser } = require("../controller/profileFunctions");
const { profileUpdateValidate, restUserPassword, permissionValidation } = require("../middleware/middleware");
const router = express.Router();

 
router.route("/updatedata").post(profileUpdateValidate, profileUpdate);
router.route("/reset").post(restUserPassword, resetPass);
router.route("/getusers").post(getUsers);
router.route("/updateuser/:id").post(profileUpdateValidate, updateUser);
router.route("/deleteuser/:id").post(deleteUser);
router.route("/permission/:id").post(permissionValidation ,permitUser);







module.exports = router;