import User from "../models/user.js";
import Sign from "../models/sign.js";

User.hasMany(Sign, { foreignKey: { allowNull: false } });
Sign.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
