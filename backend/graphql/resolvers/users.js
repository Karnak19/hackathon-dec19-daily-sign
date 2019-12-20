const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const User = require("../../models/user");
const Sign = require("../../models/sign");

module.exports = {
  users: async () => {
    try {
      const users = await User.findAll({
        include: [{ model: Sign }]
      });
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
  createUser: async ({ input }) => {
    const { email, firstName, lastName, avatar } = input;

    try {
      const user = await User.create({ email, firstName, lastName, avatar });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  signsUsersWeekly: async ({ start, end }) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Sign,
            where: {
              date: {
                [Op.between]: [start, end]
              }
            }
          }
        ]
      });
      return users;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
