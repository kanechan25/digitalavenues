"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Todos", []);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Todos", null, {});
  },
};
