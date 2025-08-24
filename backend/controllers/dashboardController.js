import { DashboardReport } from "../utils/Dashboard.js";

const getDashboard = async (req,res) => {
    try {
        const userId = req.user;
        const dashboard = await DashboardReport(userId);
        res.status(200).json(dashboard);
    }
    catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export {
    getDashboard,
};