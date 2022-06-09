"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Merchant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
          max: 50,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      join_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Products",
            schema: "database_miniproject",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Merchant",
    }
  );
  return Merchant;
};
