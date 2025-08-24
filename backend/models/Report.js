import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["daily", "monthly"],
        required: true
    },
    period: {
        type: Date,
        required: true
    },
    totalSale: {
        type: Number,
        default: 0
    },
    totalPurchase: {
        type: Number,
        default: 0
    },
    totalProfit: {
        type: Number,
        default: 0
    },
    totalExpense: {
        type: Number,
        default: 0
    },
    totalUdhaar: {
        type: Number,
        default: 0
    },
    totalPaidUdhaar: {
        type: Number,
        default: 0
    },
    netAmount: {
        type: Number,
        default: 0
    },
    totalQuantitySold: {
        type: Number,
        default: 0
    },
    numberOfSales: {
        type: Number,
        default: 0
    },
    numberOfPurchase: {
        type: Number,
        default: 0
    },
    numberOfExpenses: {
        type: Number,
        default: 0
    },
    numberOfUdhaar: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Report = mongoose.model("Report", reportSchema);
export default Report;