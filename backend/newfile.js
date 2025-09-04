import mongoose from "mongoose";
import Purchase from "./models/Purchase.js";
import Product from "./models/Product.js";

// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017/Dukaan_Digital";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Dummy userId (replace with a valid ObjectId from your database)
const userId = "68b9bc2658ec852ea5a7e945";
const today = new Date().toISOString().split("T")[0];

const purchases = [
  {
    userId,
    suppliername: "Fresh Grocery Supplies",
    category: "Grocery",
    date: today,
    items: [
      { itemname: "Rice 5kg", purchasePrice: 600, quantity: 20, unit: "bag" },
      { itemname: "Wheat Flour 10kg", purchasePrice: 1200, quantity: 15, unit: "bag" },
      { itemname: "Cooking Oil 1L", purchasePrice: 350, quantity: 50, unit: "bottle" },
      { itemname: "Sugar 5kg", purchasePrice: 500, quantity: 25, unit: "bag" },
      { itemname: "Salt 1kg", purchasePrice: 60, quantity: 100, unit: "pack" },
      { itemname: "Lentils 1kg", purchasePrice: 150, quantity: 60, unit: "pack" },
      { itemname: "Chili Powder 500g", purchasePrice: 200, quantity: 40, unit: "pack" },
      { itemname: "Turmeric Powder 500g", purchasePrice: 180, quantity: 30, unit: "pack" }
    ]
  },
  {
    userId,
    suppliername: "Daily Essentials Co.",
    category: "Grocery",
    date: today,
    items: [
      { itemname: "Tea Leaves 250g", purchasePrice: 220, quantity: 50, unit: "pack" },
      { itemname: "Coffee 250g", purchasePrice: 300, quantity: 40, unit: "pack" },
      { itemname: "Instant Noodles", purchasePrice: 50, quantity: 100, unit: "pack" },
      { itemname: "Jam 500g", purchasePrice: 400, quantity: 25, unit: "jar" },
      { itemname: "Peanut Butter 400g", purchasePrice: 500, quantity: 20, unit: "jar" },
      { itemname: "Biscuits Pack", purchasePrice: 120, quantity: 60, unit: "pack" },
      { itemname: "Corn Flakes 500g", purchasePrice: 350, quantity: 30, unit: "box" }
    ]
  },
  {
    userId,
    suppliername: "Organic Grocery Ltd.",
    category: "Grocery",
    date: today,
    items: [
      { itemname: "Olive Oil 500ml", purchasePrice: 900, quantity: 15, unit: "bottle" },
      { itemname: "Honey 250g", purchasePrice: 600, quantity: 20, unit: "jar" },
      { itemname: "Almonds 500g", purchasePrice: 1200, quantity: 10, unit: "pack" },
      { itemname: "Walnuts 500g", purchasePrice: 1500, quantity: 10, unit: "pack" },
      { itemname: "Cashews 500g", purchasePrice: 1300, quantity: 10, unit: "pack" }
    ]
  }
];

const insertData = async () => {
  try {
    for (const p of purchases) {
      // 1. Calculate total and insert into Purchase collection
      p.total = p.items.reduce((sum, i) => sum + i.purchasePrice * i.quantity, 0);
      await Purchase.create(p);

      // 2. Loop through items and insert/update Product collection
      for (const item of p.items) {
        const exists = await Product.findOne({ userId, itemname: item.itemname });
        if (!exists) {
          await Product.create({
            userId,
            itemname: item.itemname,
            category: p.category,
            purchasePrice: item.purchasePrice,
            sellingPrice: Math.round(item.purchasePrice * 1.2), // 20% markup
            quantity: item.quantity,
            unit: item.unit
          });
        }
      }
    }
    console.log("✅ Grocery purchases and products added successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error adding grocery data:", err);
    process.exit(1);
  }
};

mongoose.connection.once("open", insertData);
