import Sequelize from "sequelize";

import User from "../../../models/user.js";
import Sign from "../../../models/sign.js";

export default {
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
