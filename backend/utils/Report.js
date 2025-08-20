import Product from "../models/Product.js";

const FindReport = async (sales, expenses, udhaar) => {
    let totalSale = 0;
    let totalPurchase = 0;
    let totalProfit = 0;
    let totalQuantitySold = 0;

    // Count number of sales & purchases + sum amounts
    const numberOfSales = sales.filter(s => s.type === "sale").length;
    const numberOfPurchase = sales.filter(s => s.type === "purchase").length;

    totalSale = sales
        .filter(s => s.type === "sale")
        .reduce((sum, s) => sum + (s.totalAmount || 0), 0);

    totalPurchase = sales
        .filter(s => s.type === "purchase")
        .reduce((sum, s) => sum + (s.totalAmount || 0), 0);

    // Quantity sold & profit calculation (only for sales items)
    const allSaleItems = sales
        .filter(s => s.type === "sale")
        .flatMap(s => s.items || []);

    const productIds = [...new Set(allSaleItems.map(item => item.productId))];
    const products = await Product.find({ _id: { $in: productIds } }).lean();
    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    for (const item of allSaleItems) {
        if (!item.price || !item.quantity) continue;

        totalQuantitySold += item.quantity;

        const product = productMap.get(item.productId.toString());
        if (product && product.purchasePrice != null) {
            const saleTotal = item.price * item.quantity;
            const purchaseCost = product.purchasePrice * item.quantity;
            totalProfit += saleTotal - purchaseCost;
        }
    }

    // Expenses total
    const totalExpense = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

    // Udhaar totals
    const totalUdhaar = udhaar.reduce((sum, u) => {
        if (u.status === "pending") return sum + (u.amount || 0);
        return sum;
    }, 0);

    const totalPaidUdhaar = udhaar.reduce((sum, u) => {
        if (u.status === "paid") return sum + (u.amount || 0);
        return sum;
    }, 0);

    const adjustedProfit = totalProfit + totalPaidUdhaar;

    // Net amount
    const netAmount = adjustedProfit - totalExpense - totalUdhaar;

    return {
        totalSale,
        totalPurchase,
        totalProfit: adjustedProfit,
        totalExpense,
        totalUdhaar,
        netAmount,
        totalQuantitySold,
        numberOfSales,
        numberOfPurchase,
        numberOfExpenses: expenses.length,
        numberOfUdhaar: udhaar.length
    };
};

export { FindReport };