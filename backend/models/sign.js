const Sequelize = require("sequelize");
const moment = require("moment");

const { pad } = require("../utils");
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
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: record => {
        record.dataValues.date = parseInt(`${moment().year()}${pad(moment().dayOfYear())}`, 10); // new Date(moment().format("YYYY"), 0, day); to retrieve the real format
      }
    }
  }
);

module.exports = Sign;
