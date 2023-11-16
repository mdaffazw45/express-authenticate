const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models'); // Import your User and Admin models

const authenticateUser = async (req, res, next) => {
    try {
      const token = req.header('Authorization');
  
      if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token missing' });
      }
  
      // Verify the token and decode the payload
      const decoded = jwt.verify(token, 'SECRET-KEY'); // Replace with your JWT secret key
  
      // Check if the user exists in either the User or Admin model
      const user = await User.findByPk(decoded.id);
      const admin = await Admin.findByPk(decoded.id);
  
      if (!user && !admin) {
        return res.status(401).json({ message: 'Authentication failed. User not found' });
      }
  
      // Attach the user/admin object to the request for use in protected routes
      req.user = user || admin;
  
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Authentication failed. Invalid token' });
    }
  };
  
  const authenticateAdmin = async (req, res, next) => {
    if (!req.user || !(req.user instanceof Admin)) {
      return res.status(403).json({ message: 'Authorization failed. Admin access required' });
    }
  
    next();
  };
  
  module.exports = { authenticateUser, authenticateAdmin };