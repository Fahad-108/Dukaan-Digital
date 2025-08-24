import mongoose from "mongoose";
import Purchase from "./models/Purchase.js";
import Product from "./models/Product.js";

// MongoDB connection URI
const uri = "mongodb://localhost:27017/Dukaan_Digital";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Dummy userId (replace with a valid ObjectId from your database)
const userId = "68aaf664cf3a395123ed66e8";
const today = new Date().toISOString().split("T")[0];

const purchases = [
  {
    userId,
    suppliername: "Bakery Supplies Hub",
    category: "Bakery",
    date: today,
    items: [
      { itemname: "White Bread Loaf", purchasePrice: 120, quantity: 50, unit: "loaf" },
      { itemname: "Brown Bread Loaf", purchasePrice: 140, quantity: 40, unit: "loaf" },
      { itemname: "Whole Wheat Bread", purchasePrice: 150, quantity: 30, unit: "loaf" },
      { itemname: "Croissant", purchasePrice: 60, quantity: 100, unit: "piece" },
      { itemname: "Doughnut", purchasePrice: 50, quantity: 120, unit: "piece" },
      { itemname: "Plain Cake Rusk", purchasePrice: 200, quantity: 25, unit: "pack" },
      { itemname: "Chocolate Chip Cookies", purchasePrice: 180, quantity: 30, unit: "pack" },
      { itemname: "Cream Roll", purchasePrice: 40, quantity: 80, unit: "piece" },
      { itemname: "Pound Cake", purchasePrice: 250, quantity: 20, unit: "loaf" },
      { itemname: "Pastry", purchasePrice: 80, quantity: 60, unit: "piece" }
    ]
  },
  {
    userId,
    suppliername: "Flour & Sugar Wholesalers",
    category: "Bakery Ingredients",
    date: today,
    items: [
      { itemname: "All-Purpose Flour (Maida)", purchasePrice: 150, quantity: 50, unit: "kg" },
      { itemname: "Baking Powder", purchasePrice: 80, quantity: 10, unit: "pack" },
      { itemname: "Active Dry Yeast", purchasePrice: 120, quantity: 15, unit: "pack" },
      { itemname: "White Sugar", purchasePrice: 135, quantity: 40, unit: "kg" },
      { itemname: "Baking Chocolate (Slab)", purchasePrice: 450, quantity: 20, unit: "kg" },
      { itemname: "Vanilla Essence (100ml)", purchasePrice: 220, quantity: 10, unit: "bottle" },
      { itemname: "Icing Sugar", purchasePrice: 160, quantity: 15, unit: "kg" },
      { itemname: "Baking Soda", purchasePrice: 60, quantity: 10, unit: "pack" }
    ]
  },
  {
    userId,
    suppliername: "Specialty Baked Goods Co.",
    category: "Bakery",
    date: today,
    items: [
      { itemname: "Sourdough Bread", purchasePrice: 350, quantity: 10, unit: "loaf" },
      { itemname: "Multigrain Bread", purchasePrice: 200, quantity: 20, unit: "loaf" },
      { itemname: "Red Velvet Cupcake", purchasePrice: 90, quantity: 50, unit: "piece" },
      { itemname: "Chocolate Fudge Brownie", purchasePrice: 110, quantity: 40, unit: "piece" },
      { itemname: "Walnut Brownie", purchasePrice: 130, quantity: 30, unit: "piece" }
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
        // Check if product already exists
        const exists = await Product.findOne({ userId, itemname: item.itemname });
        if (!exists) {
          await Product.create({
            userId,
            itemname: item.itemname,
            category: p.category,
            purchasePrice: item.purchasePrice,
            sellingPrice: Math.round(item.purchasePrice * 1.2), // 20% markup for bakery items
            quantity: item.quantity,
            unit: item.unit
          });
        }
      }
    }
    console.log("✅ Bakery purchases and products added successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error adding bakery data:", err);
    process.exit(1);
  }
};

mongoose.connection.once("open", insertData);