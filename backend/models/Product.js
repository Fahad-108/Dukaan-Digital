import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        itemname: {
            type: String,
            required: true
        },
        category: {
            type: String
        },
        purchasePrice: {
            type: Number,
            required: true,
            min: 0
        },
        sellingPrice: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        unit: {
            type: String,
            // enum: ['piece', 'kg', 'litre', 'pack', 'box'],
            default: "piece"
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('product', productSchema);
export default Product;