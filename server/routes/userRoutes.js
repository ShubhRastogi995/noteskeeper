const express = require('express');
const Router = express.Router();
const {userRegister, userLogin, updateProfile} = require('../controllers/userController')
const { protect } = require("../middlewares/authmiddleware");

Router.route('/register').post(userRegister)
Router.route("/login").post(userLogin);
Router.route("/profile").post(protect, updateProfile);

module.exports = Router;