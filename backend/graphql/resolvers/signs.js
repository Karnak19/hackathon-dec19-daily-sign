const Sequelize = require("sequelize");

const Sign = require("../../models/sign");
const User = require("../../models/user");

module.exports = {
  signs: async () => {
    try {
      const signs = await Sign.findAll({ include: [{ model: User }] });
      console.log(signs);

      return signs;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  sign: async ({ id }) => {
    try {
      const sign = await Sign.findOne({
        where: {
          uuid: id
        },
        include: [{ model: User }]
      });
      return sign;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createSign: async ({ userId, signature }) => {
    try {
      const { uuid } = await Sign.create({
        UserUuid: userId,
        signature: signature
      });

      const sign = await Sign.findOne({
        where: {
          uuid
        },
        include: [{ model: User }]
      });

      return sign;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
