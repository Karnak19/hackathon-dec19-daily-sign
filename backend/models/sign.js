const Sequelize = require("sequelize");
const db = require("../sequelize");

const Sign = db.define(
  "Sign",
  {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    signature: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {}
);

module.exports = Sign;
