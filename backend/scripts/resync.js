const sequelize = require("../sequelize");
require("../models/user");

(async () => {
  await sequelize.sync({ force: true });
  console.log("Successfully resync Database !");
  process.exit(0);
})();
