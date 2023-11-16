const jwt = require('jsonwebtoken');

// Function to generate a JWT token for both User and Admin
const generateAuthToken = (userOrAdmin) => {
  const payload = {
    id: userOrAdmin.id,
    email: userOrAdmin.email,
    // Add any other user-related data you want to include in the token
  };

  // Sign the token with your secret key and set an expiration time (e.g., 1 hour)
  const token = jwt.sign(payload, 'SECRET-KEY', { expiresIn: '1h' });

  return token;
};

module.exports = generateAuthToken;
