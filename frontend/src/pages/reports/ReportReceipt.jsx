import Dukaan_Digital from '../../assets/Dukaan_Digital.svg'

const ReportReceipt = ({ report, period }) => {
    if (!report) {
        return null;
    }

    // Helper function to format numbers with commas
    const formatNumber = (num) => num?.toLocaleString() || '0';

    const totalPurch = [
        { key: "totalPurchase", label: "Total Purchase", color: "text-green-700" },
    ]
    // Define the sections of the report to display
    const mainFinancials = [
        { key: "totalSale", label: "Total Sales", color: "text-green-700" },
        { key: "totalProfit", label: "Total Profit", color: "text-green-700" },
    ];

    const otherMetrics = [
        { key: "totalExpense", label: "Total Expenses", color: "text-red-600" },
        { key: "totalUdhaar", label: "Total Credit", color: "text-orange-600" },
        { key: "totalPaidUdhaar", label: "Total Paid Credit", color: "text-orange-600" },
        { key: "totalQuantitySold", label: "Total Quantity Sold", color: "text-gray-700" },
        { key: "numberOfSales", label: "Number of Sales", color: "text-gray-700" },
        { key: "numberOfPurchase", label: "Number of Purchases", color: "text-gray-700" },
        { key: "numberOfExpenses", label: "Number of Expenses", color: "text-gray-700" },
        { key: "numberOfUdhaar", label: "Number of Credits", color: "text-gray-700" },
    ];

    return (
        <div className="flex justify-center my-10 print:mt-0 print:mb-0">
            <div className="w-full max-w-sm font-mono bg-white border border-gray-300 rounded-lg shadow-lg p-6 print:border-0 print:shadow-none print:p-0 print:w-auto">

                {/* Header */}
                <div className="text-center flex flex-col justify-center pb-4 border-b border-dashed border-gray-400 mb-4 print:border-solid">
                    <img className='h-15 mb-4' src={Dukaan_Digital} alt="Dukaan_Digital" />

                    <div className="border-t border-dashed border-gray-400 py-2 print:border-solid"></div>

                    <h4 className="text-gray-800 mb-2">{JSON.parse(sessionStorage.getItem("user")).shopname}</h4>

                    <div className="border-t border-dashed border-gray-400 py-2 print:border-solid"></div>

                    <h2 className="text-2xl font-bold text-gray-800">{period.length == 7 ? "Monthly" : "Daily"} Report</h2>
                    <p className="text-xs text-gray-500 mt-1">
                        {period}
                    </p>
                </div>

                {/* Main Financials Section */}
                    {totalPurch.map(item => (
                        <div key={item.key} className="flex justify-between items-baseline py-1">
                            <span className="text-sm font-medium text-gray-700">{item.label}:</span>
                            <span className={`text-lg font-semibold ${item.color}`}>
                                Rs. {formatNumber(report[item.key])}
                            </span>
                        </div>
                    ))}
                <div className="border-t border-dashed border-gray-400 py-2 print:border-solid"></div>

                <div className="mb-4">
                    {mainFinancials.map(item => (
                        <div key={item.key} className="flex justify-between items-baseline py-1">
                            <span className="text-sm font-medium text-gray-700">{item.label}:</span>
                            <span className={`text-lg font-semibold ${item.color}`}>
                                Rs. {formatNumber(report[item.key])}
                            </span>
                        </div>
                    ))}
                </div>
                

                {/* Separator */}
                <div className="border-t border-dashed border-gray-400 py-2 print:border-solid"></div>

                {/* Other Metrics Section */}
                <div className="mb-4 text-sm text-gray-600">
                    <h3 className="font-semibold text-gray-800 mb-2">Other Details</h3>
                    {otherMetrics.map(item => (
                        <div key={item.key} className="flex justify-between py-1">
                            <span className="text-xs font-normal">{item.label}:</span>
                            <span className="text-sm font-medium">
                                {formatNumber(report[item.key])}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Separator */}
                <div className="border-t border-dashed border-gray-400 py-2 print:border-solid"></div>

                {/* Net Amount Section */}
                <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-gray-800">Net Amount:&nbsp;</span>
                    <span className={`text-2xl font-extrabold ${report.netAmount < 0 ? "text-red-600" : "text-green-700"}`}>
                        Rs. {formatNumber(report.netAmount)}
                    </span>
                </div>

                <div className="text-center text-xs urdu-font leading-8 text-gray-800 mt-6 pt-4 border-t border-dashed border-gray-400 print:border-solid">
                    {period.length == 7 ? " اس مہینے " : " آج "}
                    <span className="underline text-blue-700 mx-1">{formatNumber(report.totalSale)}</span>
                    کی فروخت ہوئی،
                    <span className="underline text-orange-600 mx-1">{formatNumber(report.totalExpense)}</span>
                    خرچ ہوا اور
                    {report.netAmount >= 0 ? (
                        <><span className="underline text-green-600 mx-1">
                            {formatNumber(report.netAmount)}
                        </span><span>منافع</span></>
                    ) : (
                        <><span className="underline text-red-600 mx-1">
                                {formatNumber(Math.abs(report.netAmount))}
                            </span><span>نقصان</span></>
                    )}
                    {report.netAmount >= 0 ? " بچا۔" : " ہوا۔"}
                </div>


                {/* Footer */}
                <div className='flex flex-col items-start justify-center mt-4 pt-2 border-y border-dashed border-gray-400 print:border-solid'>
                    <h4 className="text-gray-600 text-sm mb-2">Contact: {JSON.parse(sessionStorage.getItem("user")).phone}</h4>
                    <h4 className="text-gray-600 text-sm mb-2">Address: {JSON.parse(sessionStorage.getItem("user")).address}</h4>
                </div>
                <div className="text-center text-xs text-gray-500 mt-6">
                    Generated at : {new Date().toLocaleDateString()}
                </div>
                <div className="text-center text-xs text-gray-500 pt-4">
                    Thank you!
                </div>

            </div>
        </div>
    );
};

export default ReportReceipt;