import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            trim: true
        },
        totalDue: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        lastPaymentDate: {
            type: Date
        }
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model('customer', customerSchema);
export default Customer;