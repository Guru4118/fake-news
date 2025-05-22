const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      console.warn('Invalid token, proceeding as guest');
      // Don't block the request, just ignore the invalid token
    }
  }

  next();
};
