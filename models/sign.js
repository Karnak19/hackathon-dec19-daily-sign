import Sequelize from "sequelize";
import moment from "moment";

import { pad, morningOrAfternoon } from "../utils.js";
import db from "../sequelize/index.js";

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
    },
    morningOrAfternoon: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isIn: [["morning", "afternoon"]]
      }
    }
  },
  {
    hooks: {
      beforeCreate: record => {
        record.dataValues.morningOrAfternoon = morningOrAfternoon();
        record.dataValues.date = parseInt(`${moment().year()}${pad(moment().dayOfYear())}`, 10); // new Date(moment().format("YYYY"), 0, day); to retrieve the real format
      }
    }
  }
);

export default Sign;
