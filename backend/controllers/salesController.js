import Product from "../models/Product.js";
import Sale from "../models/Sale.js";

const createSale = async (req, res) => {
    try {
        const { items, customerName } = req.body;
        const userId = req.user;
        if (!items || items.length === 0) {
            return res.status(400).json({ msg: "Items are required" });
        }
        let totalAmount = 0;
        let saleProfit = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ msg: `Product not found with ID: ${item.productId}` });
            }
            item.productName = product.itemname;
            item.unit = product.unit;
            console.log(item.unit)
            if (product.quantity < item.quantity) {
                return res.status(400).json({ msg: `Not enough stock for ${product.itemname}` });
            }
            item.price = product.sellingPrice;
            product.quantity -= item.quantity;
            await product.save();
            totalAmount += (item.quantity * item.price);

            saleProfit += ( item.quantity * (product.sellingPrice - product.purchasePrice));
        }
        const sale = new Sale({
            userId,
            items,
            customerName,
            totalAmount,
            saleProfit
        });
        await sale.save();
        res.status(201).json({ msg: "Sale recorded successfully", sale });
    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const getSales = async (req, res) => {
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
        const sales = await Sale.find(filter);
        if (!sales || sales.length === 0) {
            return res.status(404).json({ msg: "No record found" });
        }

        res.status(200).json(sales);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const getSalesById = async (req, res) => {
    res.send("Get Sales By Id");
}

const deleteSale = async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await Sale.findByIdAndDelete(id);
        if (!sale) {
            return res.status(404).json({ msg: "No record found" });
        }

        res.status(200).json({msg: 'Sale deleted successfully!'})
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}


export {
    createSale,
    getSales,
    getSalesById,
    deleteSale
}