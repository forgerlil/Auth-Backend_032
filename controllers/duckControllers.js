const duckCollection = require('../models/duckSchema.js');

const getDucks = async (req, res) => {
  try {
    const allDucks = await duckCollection.find();
    return res.json(allDucks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addDuck = async (req, res) => {
  try {
    const { name, image, owner } = req.body;
    if (!name || !image || !owner) throw new Error('Please send in all fields');

    const findDuck = await duckCollection.findOne({ name });
    if (findDuck) throw new Error('Duck already exists');

    const newDuck = await duckCollection.create({ name, image, owner });
    const allDucks = await duckCollection.find();
    return res.status(201).json(allDucks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { getDucks, addDuck };
