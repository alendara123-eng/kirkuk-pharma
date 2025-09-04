import { sequelize } from "./models/index.js";

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠️ يحذف الجداول ويعيد إنشائها
    console.log("✅ Database synchronized successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error syncing database:", err);
    process.exit(1);
  }
};

syncDB();
