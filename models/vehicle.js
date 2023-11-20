'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.Category, {
        foreignKey: 'category_id', // The foreign key in the Vehicle model
        as: 'vehicle_category', // Alias for the association
      });
    }
  }
  Vehicle.init({
    category_id: DataTypes.INTEGER,
    stocks: DataTypes.INTEGER,
    manufacturer: DataTypes.STRING,
    year_create: DataTypes.INTEGER,
    war_involved: DataTypes.STRING,
    range: DataTypes.STRING,
    armament: DataTypes.STRING,
    weight: DataTypes.STRING,
    engine: DataTypes.STRING,
    country_user: DataTypes.STRING,
    image_vehicle: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};