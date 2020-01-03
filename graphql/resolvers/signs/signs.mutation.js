const moment = require("moment");

const { pad, morningOrAfternoon } = require("../../../utils");
const Sign = require("../../../models/sign");

module.exports = {
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
