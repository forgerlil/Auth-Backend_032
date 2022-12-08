const express = require('express');
const userRoute = express.Router();
const { registerUser, loginUser } = require('../controllers/userControllers');

userRoute.route('/login').post(loginUser);
userRoute.route('/register').post(registerUser);

module.exports = userRoute;
