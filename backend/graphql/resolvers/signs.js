const Sequelize = require("sequelize");
const moment = require("moment");

const { pad } = require("../../utils");
const Sign = require("../../models/sign");
const User = require("../../models/user");

module.exports = {
  signs: async () => {
    try {
      const signs = await Sign.findAll({ include: [{ model: User }] });
      return signs;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  sign: async ({ id }) => {
    try {
      const sign = await Sign.findByPk(id, { include: [{ model: User }] });
      return sign;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createSign: async ({ userId, signature }) => {
    try {
      const [sign, created] = await Sign.findOrCreate({
        where: { UserUuid: userId, date: `${moment().year()}${pad(moment().dayOfYear())}` },
        defaults: {
          signature: signature
        }
      });
      return sign;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
