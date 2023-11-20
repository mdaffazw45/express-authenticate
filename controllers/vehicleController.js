const db = require('../models'); // Import your Sequelize models
const Vehicle = db.Vehicle;
const Category = db.Category;
const { upload } = require('../middleware/multerConfiguration'); // Adjust the path accordingly

exports.createVehicle = async (req, res) => {
    try {
      const {
        category_id,
        stocks,
        manufacturer,
        year_create,
        war_involved,
        range,
        armament,
        weight,
        engine,
        country_user,
      } = req.body;
  
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(400).json({ message: 'Category Not Found' });
      }
  
      const image_vehicle = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';
  
      const newVehicle = await Vehicle.create({
        category_id,
        stocks,
        manufacturer,
        year_create,
        war_involved,
        range,
        armament,
        weight,
        engine,
        country_user,
        image_vehicle,
      });
  
      res.status(201).json(newVehicle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating vehicle' });
    }
  };
  

exports.getAllVehicles = async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll({
        include: [
          {
            model: Category,
            as: 'vehicle_category',
          },
        ],
      });
      res.status(200).json(vehicles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching vehicles' });
    }
  };


  exports.deleteVehicleById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await Vehicle.destroy({
        where: { id },
      });
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting vehicle' });
    }
  };