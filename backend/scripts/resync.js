import sequelize from "../sequelize";
import "../models/user";
import "../models/sign";
import "../sequelize/associations";

(async () => {
  await sequelize.sync({ force: true });
  console.log("Successfully resync Database !");
  process.exit(0);
})();
