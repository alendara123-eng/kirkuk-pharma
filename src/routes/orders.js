import express from "express";
import { Order, Pharmacy, Medicine, Captain, User } from "../models/index.js";

const router = express.Router();

// 🟢 إنشاء طلب جديد
router.post("/create", async (req, res) => {
  try {
    const { userId, pharmacyId, medicines, address } = req.body;

    if (!userId || !pharmacyId || !medicines || medicines.length === 0) {
      return res.status(400).json({ message: "معلومات الطلب ناقصة" });
    }

    // حساب السعر الكلي
    let totalPrice = 0;
    for (const med of medicines) {
      const dbMed = await Medicine.findByPk(med.id);
      if (!dbMed) continue;
      totalPrice += dbMed.price * (med.qty || 1);
    }

    const order = await Order.create({
      userId,
      pharmacyId,
      totalPrice,
      address,
      status: "pending",
    });

    res.json({ message: "تم إنشاء الطلب ✅", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ بالسيرفر" });
  }
});

// 🟢 الكابتن يقبل الطلب
router.post("/:id/accept", async (req, res) => {
  try {
    const { id } = req.params;
    const { captainId } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });

    order.status = "accepted";
    order.captainId = captainId;
    await order.save();

    res.json({ message: "الكابتن قبل الطلب 🚴", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ بالسيرفر" });
  }
});

// 🟢 تسليم الطلب
router.post("/:id/deliver", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });

    order.status = "delivered";
    await order.save();

    res.json({ message: "تم تسليم الطلب 🎉", order });
  } catch (
