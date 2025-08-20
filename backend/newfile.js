// seed_bakery_snacks.js
import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/Dukan_Digital";

// Explicitly bind to "products" collection to avoid pluralization confusion
const productSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    itemname: { type: String, required: true },
    category: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "products");

async function seed() {
  await mongoose.connect(uri);

  const userId = "68a07fbddc30289f4b36f8fc"; // tumhara userId

  const products = [
    // Bread
    { userId, itemname: "White Bread", category: "Bread", purchasePrice: 110, sellingPrice: 140, quantity: 20, unit: "loaf" },
    { userId, itemname: "Brown Bread", category: "Bread", purchasePrice: 120, sellingPrice: 150, quantity: 15, unit: "loaf" },
    { userId, itemname: "Milk Bread", category: "Bread", purchasePrice: 130, sellingPrice: 160, quantity: 10, unit: "loaf" },
    { userId, itemname: "Burger Buns (6 pcs)", category: "Bread", purchasePrice: 90, sellingPrice: 120, quantity: 20, unit: "pack" },
    { userId, itemname: "Hot Dog Buns (6 pcs)", category: "Bread", purchasePrice: 95, sellingPrice: 125, quantity: 15, unit: "pack" },
    { userId, itemname: "Bread Rolls (6 pcs)", category: "Bread", purchasePrice: 80, sellingPrice: 110, quantity: 20, unit: "pack" },
    { userId, itemname: "Garlic Bread", category: "Bread", purchasePrice: 150, sellingPrice: 190, quantity: 12, unit: "pack" },
    { userId, itemname: "Sandwich Bread Large", category: "Bread", purchasePrice: 140, sellingPrice: 170, quantity: 15, unit: "loaf" },

    // Rusks & Biscuits
    { userId, itemname: "Rusk", category: "Rusks & Biscuits", purchasePrice: 110, sellingPrice: 140, quantity: 25, unit: "pack" },
    { userId, itemname: "Zeera Cookies", category: "Rusks & Biscuits", purchasePrice: 140, sellingPrice: 170, quantity: 20, unit: "pack" },
    { userId, itemname: "Marie Biscuits", category: "Rusks & Biscuits", purchasePrice: 90, sellingPrice: 110, quantity: 30, unit: "pack" },
    { userId, itemname: "Cream Biscuits", category: "Rusks & Biscuits", purchasePrice: 120, sellingPrice: 150, quantity: 25, unit: "pack" },
    { userId, itemname: "Wafers", category: "Rusks & Biscuits", purchasePrice: 70, sellingPrice: 95, quantity: 35, unit: "pack" },
    { userId, itemname: "Cake Rusk", category: "Rusks & Biscuits", purchasePrice: 140, sellingPrice: 180, quantity: 20, unit: "pack" },
    { userId, itemname: "Khari Biscuit", category: "Rusks & Biscuits", purchasePrice: 130, sellingPrice: 170, quantity: 18, unit: "pack" },

    // Cookies
    { userId, itemname: "Chocolate Chip Cookies", category: "Cookies", purchasePrice: 180, sellingPrice: 220, quantity: 15, unit: "pack" },

    // Pastries & Cakes
    { userId, itemname: "Puff Pastry Patty", category: "Pastries & Cakes", purchasePrice: 60, sellingPrice: 80, quantity: 30, unit: "piece" },
    { userId, itemname: "Chicken Patty", category: "Pastries & Cakes", purchasePrice: 70, sellingPrice: 90, quantity: 30, unit: "piece" },
    { userId, itemname: "Chocolate Donut", category: "Pastries & Cakes", purchasePrice: 90, sellingPrice: 120, quantity: 20, unit: "piece" },
    { userId, itemname: "Glazed Donut", category: "Pastries & Cakes", purchasePrice: 80, sellingPrice: 110, quantity: 20, unit: "piece" },
    { userId, itemname: "Vanilla Cupcake", category: "Pastries & Cakes", purchasePrice: 70, sellingPrice: 95, quantity: 24, unit: "piece" },
    { userId, itemname: "Chocolate Cupcake", category: "Pastries & Cakes", purchasePrice: 75, sellingPrice: 100, quantity: 24, unit: "piece" },
    { userId, itemname: "Blueberry Muffin", category: "Pastries & Cakes", purchasePrice: 100, sellingPrice: 130, quantity: 16, unit: "piece" },
    { userId, itemname: "Tea Cake Slice", category: "Pastries & Cakes", purchasePrice: 60, sellingPrice: 85, quantity: 30, unit: "piece" },
    { userId, itemname: "Whole Cake 1 lb", category: "Pastries & Cakes", purchasePrice: 900, sellingPrice: 1100, quantity: 5, unit: "piece" },
    { userId, itemname: "Whole Cake 2 lb", category: "Pastries & Cakes", purchasePrice: 1600, sellingPrice: 1900, quantity: 3, unit: "piece" },
    { userId, itemname: "Brownie", category: "Pastries & Cakes", purchasePrice: 70, sellingPrice: 100, quantity: 30, unit: "piece" },
    { userId, itemname: "Butter Croissant", category: "Pastries & Cakes", purchasePrice: 120, sellingPrice: 160, quantity: 18, unit: "piece" },
    { userId, itemname: "Pizza Slice", category: "Pastries & Cakes", purchasePrice: 120, sellingPrice: 160, quantity: 20, unit: "piece" },
    { userId, itemname: "Mini Pizza", category: "Pastries & Cakes", purchasePrice: 180, sellingPrice: 220, quantity: 12, unit: "piece" },

    // Savory Snacks
    { userId, itemname: "Vegetable Samosa", category: "Savory Snacks", purchasePrice: 25, sellingPrice: 40, quantity: 50, unit: "piece" },
    { userId, itemname: "Chicken Samosa", category: "Savory Snacks", purchasePrice: 35, sellingPrice: 50, quantity: 40, unit: "piece" },
    { userId, itemname: "Nimko Mix", category: "Savory Snacks", purchasePrice: 120, sellingPrice: 150, quantity: 25, unit: "pack" },

    // Chips & Namkeen
    { userId, itemname: "Chips Salted", category: "Chips & Namkeen", purchasePrice: 70, sellingPrice: 90, quantity: 40, unit: "pack" },
    { userId, itemname: "Chips Masala", category: "Chips & Namkeen", purchasePrice: 70, sellingPrice: 90, quantity: 40, unit: "pack" },
    { userId, itemname: "Popcorn", category: "Chips & Namkeen", purchasePrice: 60, sellingPrice: 80, quantity: 30, unit: "pack" },
    { userId, itemname: "Nachos", category: "Chips & Namkeen", purchasePrice: 160, sellingPrice: 200, quantity: 15, unit: "pack" },

    // Chocolates & Candy
    { userId, itemname: "Chocolate Bar Small", category: "Chocolates & Candy", purchasePrice: 100, sellingPrice: 130, quantity: 30, unit: "piece" },
    { userId, itemname: "Chocolate Bar Large", category: "Chocolates & Candy", purchasePrice: 180, sellingPrice: 230, quantity: 20, unit: "piece" },
    { userId, itemname: "Toffees", category: "Chocolates & Candy", purchasePrice: 120, sellingPrice: 150, quantity: 20, unit: "pack" },

    // Breakfast & Spreads
    { userId, itemname: "Strawberry Jam", category: "Breakfast & Spreads", purchasePrice: 280, sellingPrice: 350, quantity: 10, unit: "jar" },
    { userId, itemname: "Peanut Butter", category: "Breakfast & Spreads", purchasePrice: 450, sellingPrice: 520, quantity: 8, unit: "jar" },
    { userId, itemname: "Honey Small", category: "Breakfast & Spreads", purchasePrice: 500, sellingPrice: 600, quantity: 8, unit: "jar" },
    { userId, itemname: "Butter 200 g", category: "Breakfast & Spreads", purchasePrice: 350, sellingPrice: 420, quantity: 10, unit: "pack" },
    { userId, itemname: "Cheese Slices", category: "Breakfast & Spreads", purchasePrice: 450, sellingPrice: 520, quantity: 10, unit: "pack" },

    // Frozen Snacks
    { userId, itemname: "Frozen Paratha (5 pcs)", category: "Frozen Snacks", purchasePrice: 220, sellingPrice: 280, quantity: 20, unit: "pack" },
    { userId, itemname: "Frozen Samosa (12 pcs)", category: "Frozen Snacks", purchasePrice: 380, sellingPrice: 450, quantity: 10, unit: "pack" },
    { userId, itemname: "Frozen Chicken Nuggets 500 g", category: "Frozen Snacks", purchasePrice: 520, sellingPrice: 600, quantity: 12, unit: "pack" },

    // Ice Cream
    { userId, itemname: "Ice Cream Cup", category: "Ice Cream", purchasePrice: 80, sellingPrice: 110, quantity: 24, unit: "piece" },
    { userId, itemname: "Ice Cream Family Tub 1.5 L", category: "Ice Cream", purchasePrice: 900, sellingPrice: 1100, quantity: 4, unit: "liter" },
  ];

  // Safety: avoid duplicates if you re-run
  // You can change the filter to your own logic
  await Product.deleteMany({ userId, category: { $in: [
    "Bread","Rusks & Biscuits","Cookies","Pastries & Cakes","Savory Snacks",
    "Chips & Namkeen","Chocolates & Candy","Breakfast & Spreads","Frozen Snacks","Ice Cream"
  ]}});

  await Product.insertMany(products);
  console.log("Seeded 50 bakery and snacks products successfully");
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  mongoose.disconnect();
});