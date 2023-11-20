const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models'); // Import your User and Admin models

const authenticate = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    console.log(token, 'Ini Token');

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. Token missing' });
    }

    // Remove "Bearer " prefix from the token
    token = token.replace('Bearer ', ''); // Remove the "Bearer " prefix if present

    console.log(token, 'Ini Token 22');

    // Determine the secret key based on the token
    const decoded = jwt.decode(token); // Decoding the token to access its payload

    console.log(decoded , 'decoded')

    if (!decoded) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token' });
    }

    if (decoded.user_type === 'user') {
      secretKey = 'USER-SECRET-KEY';
    } else if (decoded.user_type === 'admin') {
      secretKey = 'ADMIN-SECRET-KEY';
    } else {
      return res.status(401).json({ message: 'Authentication failed. Invalid user type' });
    }

    // Verify the token using the determined secret key
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed. Invalid token' });
      }

      // Check if the user or admin exists based on the secret key
      let authenticatedEntity;

      if (secretKey === 'USER-SECRET-KEY') {
        authenticatedEntity = User.findByPk(decoded.id);
      } else if (secretKey === 'ADMIN-SECRET-KEY') {
        authenticatedEntity = Admin.findByPk(decoded.id);
      }

      if (!authenticatedEntity) {
        return res.status(401).json({ message: 'Authentication failed. User/Admin not found' });
      }

      // Attach the authenticated user or admin object to the request for use in protected routes
      req.authenticatedUser = authenticatedEntity;

      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed. Invalid token' });
  }
};

module.exports = authenticate;
