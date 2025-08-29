const FindReport = async (sales, purchase, expenses, udhaar) => {
    let totalSale = 0;
    let totalPurchase = 0;
    let totalQuantitySold = 0;

    // Count number of sales & purchases + sum amounts
    const numberOfSales = sales.length;
    const numberOfPurchase = purchase.length;

    totalSale = sales
        .reduce((sum, s) => sum + (s.totalAmount || 0), 0);

    totalPurchase = purchase
        .reduce((sum, s) => sum + (s.total || 0), 0);

    // Quantity sold & profit calculation (only for sales items)
    const totalProfit = sales.reduce((sum, s) => sum + (s.saleProfit || 0), 0);

    const allSaleItems = sales
        .flatMap(s => s.items || []);

    for (const item of allSaleItems) {
        if (!item.price || !item.quantity) continue;
        totalQuantitySold += item.quantity;
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


    // Net amount
    const netAmount = totalProfit - totalExpense - totalUdhaar + totalPaidUdhaar;

    return {
        totalSale,
        totalPurchase,
        totalProfit,
        totalExpense,
        totalUdhaar,
        totalPaidUdhaar,
        netAmount,
        totalQuantitySold,
        numberOfSales,
        numberOfPurchase,
        numberOfExpenses: expenses.length,
        numberOfUdhaar: udhaar.length
    };
};

export { FindReport };