// src/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Route رئيسي
app.get("/", (req, res) => {
  res.send("🚀 Kirkuk Pharma API is running!");
});

// Route للتجربة
app.get("/test", (req, res) => {
  res.json({ message: "Test route working ✅" });
});

// شغل السيرفر
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
