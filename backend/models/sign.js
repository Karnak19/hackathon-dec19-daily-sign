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
    },
    date: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  {
    hooks: {
      beforeCreate: record => {
        record.dataValues.date = Math.floor(Date.now() / 1000);
      }
    }
  }
);

module.exports = Sign;
