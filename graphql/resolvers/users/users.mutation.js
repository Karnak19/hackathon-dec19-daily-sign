const Sequelize = require("sequelize");

const User = require("../../../models/user");
const Sign = require("../../../models/sign");

module.exports = {
  createUser: async ({ input }) => {
    try {
      const user = await User.create({ ...input });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
