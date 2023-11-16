const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware'); // Import authenticateUser middleware
const userController = require('../controllers/userController');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes that require user authentication
router.get('/', authenticateUser, userController.getAllUsers);
router.get('/:id', authenticateUser, userController.getUserById);
router.put('/:id', authenticateUser, userController.updateUser);
router.put('/forgotPassword/:email', userController.forgotPassword); // New route for forgot password
router.delete('/:id', authenticateUser, userController.deleteUser);

module.exports = router;
