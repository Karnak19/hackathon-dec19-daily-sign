const sequelize = require("../sequelize");
require("../models/user");
require("../models/sign");
require("../sequelize/associations");

(async () => {
  await sequelize.sync({ force: true });
  console.log("Successfully resync Database !");
  process.exit(0);
})();
