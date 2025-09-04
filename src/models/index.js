import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  }
);

// ✅ Import models
import { User } from "./user.js";
import { Pharmacy } from "./pharmacy.js";
import { Medicine } from "./medicine.js";
import { Captain } from "./capt
