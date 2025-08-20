import Product from "../models/Product.js";
import Purchase from "../models/Purchase.js";

const addPurchase = async (req, res) => {
    try {
        const userId = req.user;
        const { items, suppliername } = req.body;
        let total = 0;
        for (const item of items) {
            const product = await Product.findOne({ itemname: item.itemname });
            if (product) {
                product.purchasePrice = item.purchasePrice;
                product.quantity += item.quantity;
                product.sellingPrice = item.sellingPrice;
                await product.save();
            } else {
                const newproduct = new Product({
                    userId,
                    itemname: item.itemname,
                    category: "",
                    purchasePrice: item.purchasePrice,
                    sellingPrice: item.sellingPrice,
                    quantity: item.quantity,
                    unit: "units"
                })
                await newproduct.save();
            }
            total += (item.purchasePrice * item.quantity);
        }
        const itemsWithoutSellingPrice = items.map(({ sellingPrice, ...rest }) => rest);
        const newPurchase = new Purchase({
            userId,
            suppliername,
            items: itemsWithoutSellingPrice,
            total
        })
        await newPurchase.save();
        res.status(200).json({ msg: `${items.length} products purchased seccessfully`})
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export {
    addPurchase
};