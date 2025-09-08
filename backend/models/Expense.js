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

// expenseSchema.index({ createdAt: -1 });   // date range queries fast
// expenseSchema.index({ userId: 1 });       // har user ke expenses filter ke liye
// expenseSchema.index({ title: 1 });        // agar title se search karni ho


const Expense = mongoose.model('expense', expenseSchema);
export default Expense