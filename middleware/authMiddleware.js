const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models'); // Import your User and Admin models

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'User authentication failed. Token missing' });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, 'USER-SECRET-KEY'); // Replace with your user JWT secret key

    // Check if the user exists in the User model
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User authentication failed. User not found' });
    }

    // Attach the authenticated user object to the request for use in protected user routes
    req.authenticatedUser = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'User authentication failed. Invalid token' });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Admin authentication failed. Token missing' });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, 'ADMIN-SECRET-KEY'); // Replace with your admin JWT secret key

    // Check if the admin exists in the Admin model
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Admin authentication failed. Admin not found' });
    }

    // Attach the authenticated admin object to the request for use in protected admin routes
    req.authenticatedAdmin = admin;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Admin authentication failed. Invalid token' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
