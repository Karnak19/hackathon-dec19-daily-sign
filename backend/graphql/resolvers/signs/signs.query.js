const Sign = require("../../../models/sign");
const User = require("../../../models/user");

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
  }
};
