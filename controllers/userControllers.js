const userCollection = require('../models/userSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).send('Please provide all fields');

    const checkUser = await userCollection.findOne({ email });
    if (checkUser) return res.status(400).send('User already exists');

    const hash = await bcrypt.hash(password, 5);

    const { _id } = await userCollection.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    const token = jwt.sign({ _id }, process.env.JWT_SECRET);

    return res.status(201).json(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send('Please provide all fields');

    const { _id } = await userCollection.findOne({ email });
    if (!checkUser) return res.status(400).send('User already exists');

    const token = jwt.sign({ _id }, process.env.JWT_SECRET);

    return res.json(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerUser, loginUser };
