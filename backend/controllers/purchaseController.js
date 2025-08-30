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
        res.status(200).json({ msg: `${items.length} products purchased successfully`})
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const getPurchases = async (req,res) => {
    try {
        const { startDate, endDate } = req.body;
        const userId = req.user;

        const filter = { userId };
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
            };
        }
        const purchases = await Purchase.find(filter);
        if (!purchases || purchases.length === 0) {
            
            return res.status(404).json({ msg: "No record found" });
        }
        res.status(200).json(purchases);
    }
    catch(err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const deletePurchase = async (req, res) => {
    try {
        const id = req.params.id;
        const purchase = await Purchase.findById(id);
        if (!purchase) {
            return res.status(404).json({ msg: "Purchase not found" });
        }
        await Purchase.findByIdAndDelete(id);
        res.status(200).json({ msg: "Purchase deleted successfully!" })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export {
    addPurchase,
    getPurchases,
    deletePurchase
};