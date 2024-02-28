const jwt = require('jsonwebtoken');
const config = require('../config');

exports.generateToken = (user) => {
  return jwt.sign({ userId: user.userId }, config.jwtSecret, { expiresIn: '1h' });
};

exports.generateAnonymousToken = () => {
  return jwt.sign({ anonymous: true }, config.jwtSecret, { expiresIn: '1h' });
};
