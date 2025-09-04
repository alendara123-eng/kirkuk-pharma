import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🟢 تسجيل دخول باستخدام OTP (مبسطة)
router.post("/login", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "رقم الهاتف مطلوب" });
    }

    // 👇 هنا المفروض نرسل OTP حقيقي عبر SMS
    // لكن لو ما عندك Twilio الآن، نخليه يطبع OTP في الكونسول
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(`📱 OTP for ${phone}: ${otp}`);

    // نخزن الـ OTP مؤقت (في ذاكرة السيرفر فقط)
    // في مشروع حقيقي لازم يكون Redis أو قاعدة بيانات
    router.otp = { phone, otp, createdAt: Date.now() };

    return res.json({ message: "تم إرسال OTP (شوف الكونسول)", otp }); // للأختبار فقط
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ بالسيرفر" });
  }
});

// 🟢 التحقق من OTP
router.post("/verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!router.otp || router.otp.phone !== phone || router.otp.otp != otp) {
      return res.status(400).json({ message: "OTP غير صحيح" });
    }

    // توليد توكن JWT
    const token = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ message: "تم تسجيل الدخول ✅", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ بالسيرفر" });
  }
});

export default router;
