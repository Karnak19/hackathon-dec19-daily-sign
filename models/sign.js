const Sequelize = require("sequelize");
const moment = require("moment");
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
        record.dataValues.date = moment().dayOfYear(); // new Date(moment().format("YYYY"), 0, day); to retrieve the real format
      }
    }
  }
);

module.exports = Sign;
