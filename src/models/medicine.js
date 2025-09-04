import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Medicine = sequelize.define("Medicine", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // رابط صورة الدواء
    allowNull: true,
  },
  pharmacyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
