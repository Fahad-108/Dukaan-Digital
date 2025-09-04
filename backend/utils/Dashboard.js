import Product from "../models/Product.js";
import Expense from "../models/Expense.js";
import Sale from "../models/Sale.js";
import Udhaar from "../models/Udhaar.js";

const DashboardReport = async (userId) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-11
    const currentYear = currentDate.getFullYear();

    // Helper function to get past month and year
    const getPastMonthAndYear = (monthsAgo) => {
        const pastDate = new Date();
        pastDate.setMonth(currentDate.getMonth() - monthsAgo);
        return {
            month: pastDate.getMonth() + 1, // 1-12
            year: pastDate.getFullYear()
        };
    };

    const month1 = getPastMonthAndYear(0); // Current month
    const month2 = getPastMonthAndYear(1); // 1 month ago
    const month3 = getPastMonthAndYear(2); // 2 months ago

    const Udhaars = await Udhaar.find({ userId, status: "pending" });
    
    const Expenses = await Expense.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, month1.month] },
                { $eq: [{ $year: "$createdAt" }, month1.year] }
            ]
        }
    });

    const Expenses2 = await Expense.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, month2.month] },
                { $eq: [{ $year: "$createdAt" }, month2.year] }
            ]
        }
    });
    
    const Expenses3 = await Expense.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, month3.month] },
                { $eq: [{ $year: "$createdAt" }, month3.year] }
            ]
        }
    });
    
    const Sales = await Sale.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, month1.month] },
                { $eq: [{ $year: "$createdAt" }, month1.year] }
            ]
        }
    });
    
    const Sales3 = await Sale.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, month2.month] },
                { $eq: [{ $year: "$createdAt" }, month2.year] }
            ]
        }
    });
    
    const Sales4 = await Sale.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, month3.month] },
                { $eq: [{ $year: "$createdAt" }, month3.year] }
            ]
        }
    });

    const totalSales = Sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
    const totalExpenses = Expenses.reduce((sum, s) => sum + (s.amount || 0), 0);
    const totalCredit = Udhaars.reduce((sum, s) => sum + (s.amount || 0), 0);
    const Profit = Sales.reduce((sum, s) => sum + (s.saleProfit || 0), 0);

    const summary = {
        sales: totalSales,
        expenses: totalExpenses,
        profit: Profit,
        credit: totalCredit,
    };

    const salesData = [
        { month: monthNames[month3.month - 1], sales: Sales4.reduce((sum, s) => sum + (s.totalAmount || 0), 0), expenses: Expenses3.reduce((sum, s) => sum + (s.amount || 0), 0) },
        { month: monthNames[month2.month - 1], sales: Sales3.reduce((sum, s) => sum + (s.totalAmount || 0), 0), expenses: Expenses2.reduce((sum, s) => sum + (s.amount || 0), 0) },
        { month: monthNames[month1.month - 1], sales: totalSales, expenses: totalExpenses },
    ];

    const min = 3;
    const products = await Product.find({
        userId: userId,
        quantity: { $lt: min }
    }).select("itemname quantity");

    const lowStock = products.map(item => ({
        item: item.itemname,
        qty: item.quantity
    }));

    console.log({
        summary: summary,
        salesData: salesData,
        lowStock: lowStock
    })
    return ({
        summary: summary,
        salesData: salesData,
        lowStock: lowStock
    })
}

export { DashboardReport }