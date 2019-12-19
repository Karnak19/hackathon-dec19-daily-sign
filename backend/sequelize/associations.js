const User = require("../models/user");
const Sign = require("../models/sign");

User.hasMany(Sign, { foreignKey: { allowNull: false } });
Sign.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
