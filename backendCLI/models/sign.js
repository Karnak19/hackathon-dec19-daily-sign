"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sign = sequelize.define(
    "Sign",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      morningOrAfternoon: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [["morning", "afternoon"]]
        }
      }
    },
    {}
  );
  Sign.associate = function(models) {
    Sign.belongsTo(models.User);
  };
  return Sign;
};
