const Sequelize = require("sequelize");

const User = require("../../models/user");

module.exports = {
  users: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  user: async ({ id }) => {
    try {
      const user = await User.findOne({ where: { uuid: id } });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async ({ email }) => {
    try {
      const user = await User.create({ email });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
