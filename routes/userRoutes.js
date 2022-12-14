const express = require('express');
const userRoute = express.Router();
const {
  registerUser,
  loginUser,
  getOneUser,
} = require('../controllers/userControllers');
const { verifyToken } = require('../middlewares/verifyToken.js');

userRoute.route('/login').post(loginUser);
userRoute.route('/register').post(registerUser);
userRoute.route('/auth').post(verifyToken, getOneUser);

module.exports = userRoute;
