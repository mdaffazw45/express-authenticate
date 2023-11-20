'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Vehicle, {
        foreignKey: 'category_id', // The foreign key in the Vehicle model
        as: 'vehicle_category', // Alias for the association
      });
    }
  }
  Category.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};