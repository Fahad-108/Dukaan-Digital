import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        shopname: {
            type: String,
            required: true,
            trim: true
        },
        city : {
            type: String,
            required: true,
            trim: true
        },
        ownername: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Shop = mongoose.model('shop', shopSchema);
export default Shop;