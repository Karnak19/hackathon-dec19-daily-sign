"use strict";
const { v4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: v4(),
          firstName: "John",
          lastName: "Die",
          email: "johndie@gmail.com",
          avatar: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: v4(),
          firstName: "Jane",
          lastName: "Doe",
          email: "janedoe@gmail.com",
          avatar: "",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
