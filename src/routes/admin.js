import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize, User, Pharmacy, Medicine, Captain, Order } from "../models/index.js";

AdminJS.registerAdapter(AdminJSSequelize);

const router = express.Router();

// 🟢 إعداد لوحة التحكم
const admin = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: [User, Pharmacy, Medicine, Captain, Order],
  branding: {
    companyName: "💊 Kirkuk Pharma",
    logo: "https://cdn-icons-png.flaticon.com/512/2966/2966489.png",
    theme: {
      colors: {
        primary100: "#00A36C",
        primary80: "#00A36C",
      },
    },
  },
});

// 🟢 تسجيل دخول الأدمن
const ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
  cookieName: "adminjs",
  cookiePassword: process.env.JWT_SECRET,
});

router.use(admin.options.rootPath, adminRouter);

export default router;
