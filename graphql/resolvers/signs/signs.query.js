import Sign from "../../../models/sign.js";
import User from "../../../models/user.js";

export default {
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
