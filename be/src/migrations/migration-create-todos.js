"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Todos", {
      id: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.DATE,
      },
      state: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Todos");
  },
};
