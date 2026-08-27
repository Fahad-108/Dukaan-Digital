import React, { useRef, useState } from "react";
import Dukaan_Digital from "../../assets/Dukaan_Digital.svg";
import { FaWhatsapp, FaPrint, FaDownload } from "react-icons/fa";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

const ReportReceipt = ({ report, period }) => {
    const receiptRef = useRef(null);
    const [loadingAction, setLoadingAction] = useState(null);

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

    // Helper to capture the receipt element as a Canvas
    const getReceiptCanvas = async () => {
        if (!receiptRef.current) return null;
        return await html2canvas(receiptRef.current, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
            logging: false,
        });
    };

    // Helper to capture receipt as Blob
    const captureReceiptBlob = async () => {
        const canvas = await getReceiptCanvas();
        if (!canvas) return null;
        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/png");
        });
    };

    // Helper to capture receipt as Data URL
    const captureReceiptDataUrl = async () => {
        const canvas = await getReceiptCanvas();
        if (!canvas) return null;
        return canvas.toDataURL("image/png");
    };

    // 1. Save Image (Download exact receipt as PNG image)
    const handleSaveImage = async () => {
        if (!receiptRef.current) return;
        setLoadingAction("save");
        const toastId = toast.loading("Generating report image...");
        try {
            const dataUrl = await captureReceiptDataUrl();
            if (!dataUrl) throw new Error("Could not generate image");

            const cleanPeriod = (period || "report").replace(/[^a-zA-Z0-9-_]/g, "_");
            const cleanShopName = (user.shopname || "Dukaan").replace(/[^a-zA-Z0-9-_]/g, "_");
            const filename = `Report_${cleanPeriod}_${cleanShopName}.png`;

            const link = document.createElement("a");
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Report image saved successfully!", { id: toastId });
        } catch (error) {
            console.error("Save image failed:", error);
            toast.error("Failed to save image. Please try again.", { id: toastId });
        } finally {
            setLoadingAction(null);
        }
    };

    // 2. Share on WhatsApp (Share exact report image)
    const handleShareWhatsApp = async () => {
        if (!receiptRef.current) return;
        setLoadingAction("whatsapp");
        const toastId = toast.loading("Preparing report image for WhatsApp...");
        try {
            const blob = await captureReceiptBlob();
            if (!blob) throw new Error("Could not generate image");

            const cleanPeriod = (period || "report").replace(/[^a-zA-Z0-9-_]/g, "_");
            const filename = `Report_${cleanPeriod}.png`;
            const file = new File([blob], filename, { type: "image/png" });

            // Mobile & Supported Browsers: Native Share with image file directly to WhatsApp
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                toast.dismiss(toastId);
                await navigator.share({
                    files: [file],
                    title: `${user.shopname || "Dukaan"} Report`,
                });
                return;
            }

            // Desktop Fallback: Copy image to clipboard, download file, and open WhatsApp Web
            let copied = false;
            try {
                if (navigator.clipboard && window.ClipboardItem) {
                    await navigator.clipboard.write([
                        new ClipboardItem({ "image/png": blob })
                    ]);
                    copied = true;
                }
            } catch {
                // Clipboard write optional if browser restricts it
            }

            // Trigger image download
            const dataUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(dataUrl), 2000);

            // Open WhatsApp Web
            window.open("https://web.whatsapp.com/", "_blank");

            if (copied) {
                toast.success("Report image copied to clipboard & downloaded! Paste (Ctrl+V) in WhatsApp.", { id: toastId, duration: 6000 });
            } else {
                toast.success("Report image downloaded! Attach it in WhatsApp.", { id: toastId, duration: 5000 });
            }
        } catch (error) {
            if (error?.name !== "AbortError") {
                toast.error("Could not share image directly. Saved to downloads instead.", { id: toastId });
            } else {
                toast.dismiss(toastId);
            }
        } finally {
            setLoadingAction(null);
        }
    };

    // 3. Print (Print exact report bill)
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col items-center my-8 w-full print:my-0">
            {/* 3 Buttons: Save Image, Share on WhatsApp, Print */}
            <div className="no-print print:hidden flex flex-wrap items-center justify-center gap-3 mb-6 w-full max-w-md px-2">
                {/* 1. Save Image */}
                <button
                    type="button"
                    onClick={handleSaveImage}
                    disabled={loadingAction !== null}
                    className="flex-1 min-w-[130px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                    title="Save complete report as image"
                >
                    <FaDownload className="text-sm" />
                    <span>{loadingAction === "save" ? "Saving..." : "Save Image"}</span>
                </button>

                {/* 2. Share on WhatsApp */}
                <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    disabled={loadingAction !== null}
                    className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                    title="Share report image on WhatsApp"
                >
                    <FaWhatsapp className="text-lg" />
                    <span>{loadingAction === "whatsapp" ? "Preparing..." : "Share on WhatsApp"}</span>
                </button>

                {/* 3. Print */}
                <button
                    type="button"
                    onClick={handlePrint}
                    disabled={loadingAction !== null}
                    className="flex-1 min-w-[110px] flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                    title="Print report bill"
                >
                    <FaPrint className="text-sm" />
                    <span>Print</span>
                </button>
            </div>

            {/* Receipt Card (Captured exactly as displayed) */}
            <div
                ref={receiptRef}
                className="w-full max-w-sm font-mono bg-white border border-gray-300 rounded-lg shadow-lg p-6 print:border-0 print:shadow-none print:p-0 print:w-auto printable-receipt"
                style={{ backgroundColor: "#ffffff" }}
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