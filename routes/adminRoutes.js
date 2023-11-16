const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authMiddleware'); // Import the authenticateAdmin middleware

// Define routes for admin-related operations
router.get('/', authenticateAdmin, adminController.getAllAdmins);
router.get('/:id', authenticateAdmin, adminController.getAdminById);
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.put('/:id', authenticateAdmin, adminController.updateAdmin);
router.put('/forgotPassword/:email', adminController.forgotPassword); // New route for forgot password
router.delete('/:id', authenticateAdmin, adminController.deleteAdmin);

module.exports = router;
