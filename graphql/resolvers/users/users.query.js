import Sequelize from "sequelize";
const Op = Sequelize.Op;

import User from "../../../models/user.js";
import Sign from "../../../models/sign.js";

export default {
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
      const user = await User.findByPk(id);
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
      const sortedUsers = users.map(user => {
        user.Signs.sort((a, b) => a.date - b.date);
        return user;
      });
      return sortedUsers;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
