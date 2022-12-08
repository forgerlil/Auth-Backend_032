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

    // In addition to finding the user, we have to select and forcefully include the password (with the + sign
    // when specifying the field) to come back from querying the user, so we can validate the password.
    const checkUser = await userCollection
      .findOne({ email })
      .select('+password');
    if (!checkUser) return res.status(400).send('User already exists');

    // In addition to what we spoke, whenever a user is logged in, we have to check whether
    // the password that comes from the request is correct!
    // The bcrypt library can encode our password and compare to the encrypted password stored
    // in the document in the database. If they don't match, we send an error back to the client.
    const pwdMatch = await bcrypt.compare(password, checkUser.password);
    if (!pwdMatch) return res.status(400).send('Incorrect password');

    const token = jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET);

    return res.json(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerUser, loginUser };
