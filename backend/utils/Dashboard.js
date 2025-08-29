import Product from "../models/Product.js";
import Expense from "../models/Expense.js";
import Sale from "../models/Sale.js";
import Udhaar from "../models/Udhaar.js";

const DashboardReport = async (userId) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const Udhaars = await Udhaar.find({ userId, status: "pending" });
    const Expenses = await Expense.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, currentMonth] },  
                { $eq: [{ $year: "$createdAt" }, currentYear] }
            ]
        }
    });
    console.log(Expenses);
    
    const Expenses3 = await Expense.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, currentMonth - 2] },
                { $eq: [{ $year: "$createdAt" }, currentYear] }
            ]
        }
    });
    const Expenses4 = await Expense.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, currentMonth - 3] },
                { $eq: [{ $year: "$createdAt" }, currentYear] }
            ]
        }
    });
    const Sales = await Sale.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, currentMonth] },
                { $eq: [{ $year: "$createdAt" }, currentYear] }
            ]
        }
    });

    const totalSales = Sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
    const netProfit = Sales.reduce((sum, s) => sum + (s.saleProfit || 0), 0)
    const totalExpenses = Expenses.reduce((sum, s) => sum + (s.amount || 0), 0);
    const totalCredit = Udhaars.reduce((sum, s) => sum + (s.amount || 0), 0);
    

    const summary = {
        sales: totalSales,
        expenses: totalExpenses,
        profit: netProfit,
        credit: totalCredit,
    };

    const Sales3 = await Sale.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, currentMonth - 2] },
                { $eq: [{ $year: "$createdAt" }, currentYear] }
            ]
        }
    });
    const Sales4 = await Sale.find({
        userId,
        $expr: {
            $and: [
                { $eq: [{ $month: "$createdAt" }, currentMonth - 3] },
                { $eq: [{ $year: "$createdAt" }, currentYear] }
            ]
        }
    });

    const salesData = [
        { month: monthNames[currentMonth - 3], sales: Sales4.reduce((sum, s) => sum + (s.totalAmount || 0), 0), expenses: Expenses4.reduce((sum, s) => sum + (s.amount || 0), 0) },
        { month: monthNames[currentMonth - 2], sales: Sales3.reduce((sum, s) => sum + (s.totalAmount || 0), 0), expenses: Expenses3.reduce((sum, s) => sum + (s.amount || 0), 0) },
        { month: monthNames[currentMonth - 1], sales: Sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0), expenses: Expenses.reduce((sum, s) => sum + (s.amount || 0), 0)},
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

    return ({
        summary: summary,
        salesData: salesData,
        lowStock: lowStock
    })

}

export { DashboardReport }