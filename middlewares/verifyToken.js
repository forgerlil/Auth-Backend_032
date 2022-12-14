const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(400).send('No token sent');
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  if (!_id) return res.status(403).send('Invalid token');
  req.userId = _id;
  next();
};

module.exports = { verifyToken };
