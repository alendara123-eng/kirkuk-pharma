import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Captain = sequelize.define("Captain", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  vehicle: {
    type: DataTypes.STRING, // نوع وسيلة التوصيل (سيارة/دراجة نارية)
    allowNull: true,
  },
});
