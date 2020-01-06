import moment from "moment";

import { pad, morningOrAfternoon } from "../../../utils.js";
import Sign from "../../../models/sign.js";

export default {
  createSign: async ({ userId, signature }) => {
    try {
      const [sign, created] = await Sign.findOrCreate({
        where: {
          UserUuid: userId,
          date: `${moment().year()}${pad(moment().dayOfYear())}`,
          morningOrAfternoon: morningOrAfternoon()
        },
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
