import React, { useRef, useState } from "react";
import Dukaan_Digital from "../../assets/Dukaan_Digital.svg";
import { FaWhatsapp, FaPrint, FaDownload, FaCopy, FaCheck } from "react-icons/fa";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

const ReportReceipt = ({ report, period }) => {
    const receiptRef = useRef(null);
    const [savingImage, setSavingImage] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!report) {
        return null;
    }

    // Safely retrieve user data from sessionStorage
    const getUserData = () => {
        try {
            return JSON.parse(sessionStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    };
    const user = getUserData();

    // Helper function to format numbers with commas
    const formatNumber = (num) => num?.toLocaleString() || "0";

    const totalPurch = [
        { key: "totalPurchase", label: "Total Purchase", color: "text-green-700" },
    ];

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

    // Generate formatted WhatsApp text
    const generateWhatsAppMessage = () => {
        const isMonthly = period?.length === 7;
        const reportTitle = isMonthly ? "Monthly Report" : "Daily Report";
        const shopName = user.shopname || "Dukaan Digital";

        const lines = [
            `🏪 *${shopName.toUpperCase()}*`,
            `📊 *${reportTitle}* - ${period}`,
            `───────────────────────`,
            `🛒 *Total Purchase:* Rs. ${formatNumber(report.totalPurchase)}`,
            `💰 *Total Sales:* Rs. ${formatNumber(report.totalSale)}`,
            `📈 *Total Profit:* Rs. ${formatNumber(report.totalProfit)}`,
            `💸 *Total Expenses:* Rs. ${formatNumber(report.totalExpense)}`,
            `🤝 *Total Credit (Udhaar):* Rs. ${formatNumber(report.totalUdhaar)}`,
            `💳 *Paid Credit:* Rs. ${formatNumber(report.totalPaidUdhaar)}`,
            `───────────────────────`,
            `📦 *Total Quantity Sold:* ${formatNumber(report.totalQuantitySold)}`,
            `🧾 *Number of Sales:* ${formatNumber(report.numberOfSales)}`,
            `🛍️ *Number of Purchases:* ${formatNumber(report.numberOfPurchase)}`,
            `📑 *Number of Expenses:* ${formatNumber(report.numberOfExpenses)}`,
            `───────────────────────`,
            `💵 *NET AMOUNT:* Rs. ${formatNumber(report.netAmount)} (${report.netAmount >= 0 ? "Profit / منافع" : "Loss / نقصان"})`,
            `───────────────────────`
        ];

        if (user.phone) lines.push(`📞 Contact: ${user.phone}`);
        if (user.address) lines.push(`📍 Address: ${user.address}`);
        lines.push(`🕒 Generated on: ${new Date().toLocaleDateString()}`);
        lines.push(`_Generated via Dukaan Digital_`);

        return lines.join("\n");
    };

    // Share via WhatsApp
    const handleShareWhatsApp = () => {
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        toast.success("Opening WhatsApp...");
    };

    // Save as PDF / Print
    const handlePrint = () => {
        window.print();
    };

    // Save as Image (PNG)
    const handleSaveImage = async () => {
        if (!receiptRef.current) return;
        setSavingImage(true);
        const toastId = toast.loading("Saving receipt as image...");
        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            const cleanPeriod = (period || "report").replace(/[^a-zA-Z0-9-_]/g, "_");
            link.download = `Report_${cleanPeriod}.png`;
            link.href = imgData;
            link.click();
            toast.success("Receipt saved successfully!", { id: toastId });
        } catch (error) {
            console.error("Error saving image:", error);
            toast.error("Failed to save image", { id: toastId });
        } finally {
            setSavingImage(false);
        }
    };

    // Copy formatted report text
    const handleCopyText = () => {
        const message = generateWhatsAppMessage();
        navigator.clipboard.writeText(message).then(() => {
            setCopied(true);
            toast.success("Report copied to clipboard!");
            setTimeout(() => setCopied(false), 2500);
        }).catch(() => {
            toast.error("Failed to copy report");
        });
    };

    return (
        <div className="flex flex-col items-center my-8 w-full print:my-0">
            {/* Action Bar (Share & Save Options) - Hidden on Print */}
            <div className="no-print print:hidden flex flex-wrap items-center justify-center gap-3 mb-6 w-full max-w-md px-2">
                {/* Share on WhatsApp */}
                <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                    title="Share report summary via WhatsApp"
                >
                    <FaWhatsapp className="text-lg" />
                    <span>Share WhatsApp</span>
                </button>

                {/* Save / Print (PDF) */}
                <button
                    type="button"
                    onClick={handlePrint}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                    title="Print or save as PDF"
                >
                    <FaPrint className="text-sm" />
                    <span>Save / Print PDF</span>
                </button>

                {/* Save as Image (PNG) */}
                <button
                    type="button"
                    onClick={handleSaveImage}
                    disabled={savingImage}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                    title="Download receipt as PNG image"
                >
                    <FaDownload className="text-sm" />
                    <span>{savingImage ? "Saving..." : "Save Image"}</span>
                </button>

                {/* Copy Text Summary */}
                <button
                    type="button"
                    onClick={handleCopyText}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl border border-gray-300 shadow-sm transition-all duration-200 cursor-pointer"
                    title="Copy report text to clipboard"
                >
                    {copied ? <FaCheck className="text-sm text-green-600" /> : <FaCopy className="text-sm" />}
                    <span>{copied ? "Copied!" : "Copy Text"}</span>
                </button>
            </div>

            {/* Receipt Card */}
            <div
                ref={receiptRef}
                className="w-full max-w-sm font-mono bg-white border border-gray-300 rounded-lg shadow-lg p-6 print:border-0 print:shadow-none print:p-0 print:w-auto printable-receipt"
            >
                {/* Header */}
                <div className="text-center flex flex-col justify-center pb-4 border-b border-dashed border-gray-400 mb-4 print:border-solid">
                    <img className="h-15 mb-4 mx-auto" src={Dukaan_Digital} alt="Dukaan_Digital" />

                    <div className="border-t border-dashed border-gray-400 py-2 print:border-solid"></div>

                    <h4 className="text-gray-800 font-semibold mb-2">{user.shopname || "Dukaan Digital"}</h4>

                    <div className="border-t border-dashed border-gray-400 py-2 print:border-solid"></div>

                    <h2 className="text-2xl font-bold text-gray-800">{period.length === 7 ? "Monthly" : "Daily"} Report</h2>
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
                    {period.length === 7 ? " اس مہینے " : " آج "}
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
                <div className="flex flex-col items-start justify-center mt-4 pt-2 border-y border-dashed border-gray-400 print:border-solid">
                    <h4 className="text-gray-600 text-sm mb-2">Contact: {user.phone || "N/A"}</h4>
                    <h4 className="text-gray-600 text-sm mb-2">Address: {user.address || "N/A"}</h4>
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