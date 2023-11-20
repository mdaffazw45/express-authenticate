'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      stocks: {
        type: Sequelize.INTEGER
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      year_create: {
        type: Sequelize.INTEGER
      },
      war_involved: {
        type: Sequelize.STRING
      },
      range: {
        type: Sequelize.STRING
      },
      armament: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      engine: {
        type: Sequelize.STRING
      },
      country_user: {
        type: Sequelize.STRING
      },
      image_vehicle: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehicles');
  }
};