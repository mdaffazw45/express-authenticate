const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // Import authenticate middleware
const vehicleController = require('../controllers/vehicleController');
const upload = require('../middleware/multer'); // Import the upload middleware

router.post('/', upload.single('image_vehicle'), vehicleController.createVehicle);
router.get('/', authenticate , vehicleController.getAllVehicles);
router.delete('/:id', vehicleController.deleteVehicleById);

module.exports = router;
