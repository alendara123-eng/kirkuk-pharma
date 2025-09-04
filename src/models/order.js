import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "delivered"),
    defaultValue: "pending",
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // مفاتيح ربط
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pharmacyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  captainId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
