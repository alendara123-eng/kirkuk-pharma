import { Pharmacy, Medicine } from "./models/index.js";

const seedDB = async () => {
  try {
    // 🟢 صيدليات وأدوية (10 × 3)
    const pharmacies = [
      { name: "صيدلية الشفاء", address: "كركوك - رحيم اوه" },
      { name: "صيدلية الحياة", address: "كركوك - المصلى" },
      { name: "صيدلية بغداد", address: "كركوك - تسعين" },
      { name: "صيدلية دار الشفاء", address: "كركوك - دوميز" },
      { name: "صيدلية نور", address: "كركوك - القورية" },
      { name: "صيدلية الرحمة", address: "كركوك - العروبة" },
      { name: "صيدلية الزهراء", address: "كركوك - طريق بغداد" },
      { name: "صيدلية العراق", address: "كركوك - شارع المحافظة" },
      { name: "صيدلية الياسمين", address: "كركوك - القادسية" },
      { name: "صيدلية الرشيد", address: "كركوك - رحيم اوه" },
    ];

    const medicines = [
      { name: "Paracetamol", price: 1000, image: "https://i.ibb.co/r7fPZpD/panadol.png" },
      { name: "Amoxicillin", price: 2500, image: "https://i.ibb.co/G5WgR9g/amoxicillin.png" },
      { name: "Vitamin C", price: 1500, image: "https://i.ibb.co/T1J7M9W/vitamin-c.png" },
    ];

    for (const ph of pharmacies) {
      const pharmacy = await Pharmacy.create(ph);
      for (const med of medicines) {
        await Medicine.create({
          ...med,
          pharmacyId: pharmacy.id,
        });
      }
    }

    console.log("✅ Pharmacies & medicines seeded successfully");
    console.log("🔑 Admin account موجود في ملف .env");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
