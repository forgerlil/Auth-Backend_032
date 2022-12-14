const express = require('express');
const duckRoute = express.Router();
const { getDucks, addDuck } = require('../controllers/duckControllers');

duckRoute.route('/').get(getDucks).post(addDuck);

module.exports = duckRoute;
