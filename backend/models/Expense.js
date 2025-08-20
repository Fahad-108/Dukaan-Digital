import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Expense = mongoose.model('expense', expenseSchema);
export default Expense