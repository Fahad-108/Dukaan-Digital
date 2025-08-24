import Expense from "../models/Expense.js";
import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";
import Udhaar from "../models/Udhaar.js";
import Report from "../models/Report.js";
import { FindReport } from "../utils/Report.js";

const getReport = async (req, res) => {
    try {
        const userId = req.user;
        const { date, month } = req.body;

        let createdAt;
        let type;
        let period;

        if (date) {
            // DAILY REPORT
            type = 'daily';
            period = date;
            const selectedDate = new Date(date);
            if (isNaN(selectedDate.getTime())) {
                return res.status(400).json({ msg: "Invalid date format, use YYYY-MM-DD" });
            }
            const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
            createdAt = { $gte: startOfDay, $lte: endOfDay };

        } else if (month) {
            // MONTHLY REPORT
            type = 'monthly';
            period = month;
            const [year, mon] = month.split("-");
            if (!year || !mon || isNaN(year) || isNaN(mon)) {
                return res.status(400).json({ msg: "Invalid month format, use YYYY-MM" });
            }
            const startOfMonth = new Date(year, mon - 1, 1, 0, 0, 0, 0);
            const endOfMonth = new Date(year, mon, 0, 23, 59, 59, 999);
            createdAt = { $gte: startOfMonth, $lte: endOfMonth };

        } else {
            return res.status(400).json({ msg: "Please provide either 'date' (YYYY-MM-DD) or 'month' (YYYY-MM)" });
        }

        // Fetch data
        const sale = await Sale.find({ userId, createdAt });
        const purchase = await Purchase.find({ userId, createdAt });
        const expense = await Expense.find({ userId, createdAt });
        const udhaar = await Udhaar.find({
            userId,
            $or: [
                { createdAt: createdAt },
                { updatedAt: createdAt }
            ]
        });

        if (!sale.length && !purchase.length && !expense.length && !udhaar.length) {
            return res.status(404).json({ msg: "No data found for this selection" });
        }

        // Generate fresh report every time
        const report = await FindReport(sale, purchase, expense, udhaar);

        // Update if exists else create (upsert)
        const updatedReport = await Report.findOneAndUpdate(
            { type, period, userId },  // filter
            {
                userId,
                type,
                period,
                totalSale: report.totalSale,
                totalPurchase: report.totalPurchase,
                totalProfit: report.totalProfit,
                totalExpense: report.totalExpense,
                totalUdhaar: report.totalUdhaar,
                totalPaidUdhaar: report.totalPaidUdhaar,
                netAmount: report.netAmount,
                totalQuantitySold: report.totalQuantitySold,
                numberOfSales: report.numberOfSales,
                numberOfPurchase: report.numberOfPurchase,
                numberOfExpenses: report.numberOfExpenses,
                numberOfUdhaar: report.numberOfUdhaar
            },
            { new: true, upsert: true } // return new doc and create if not exists
        ).select('-userId -id -type -period -createdAt -updatedAt -_v');

        res.status(200).json(updatedReport);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export { getReport };
