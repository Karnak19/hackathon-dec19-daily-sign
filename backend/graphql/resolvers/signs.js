const Sequelize = require("sequelize");

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
  }
};
