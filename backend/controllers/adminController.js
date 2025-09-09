import User from "../models/User.js";
import UserStatus from "../models/UserStatus.js";import Expense from "../models/Expense.js";
import Product from "../models/Product.js";
import Purchase from "../models/Purchase.js";
import Report from "../models/Report.js";
import Sale from "../models/Sale.js";
import Udhaar from "../models/Udhaar.js";
import bcrypt from 'bcrypt';

const getAdminDashboard = async (req, res) => {
  try {
    const shops = await User.find({ role: "manager" }, "-password");
    if (!shops || shops.length === 0) {
      return res.status(404).json({ msg: "Not found" });
    }

    const shopsWithStatus = await Promise.all(
      shops.map(async (shop) => {
        const userStatus = await UserStatus.findOne({ userId: shop._id });
        return {
          ...shop.toObject(),
          status: userStatus ? userStatus.status : null,
        };
      })
    );

    res.status(200).json({
      totalShops: shopsWithStatus.length,
      shops: shopsWithStatus,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const editUserProfile = async (req, res) => {
    try {
        const { name, email, shopname, phone, password } = req.body;
        const userId = req.params.id;

        const shop = await User.findById(userId);
        if (!shop) {
            return res.status(404).json({ msg: "Shop not found" })
        }
        const updateData = { name, email, shopname, phone };

        if (password && password.trim() !== "") {
          const hashed = await bcrypt.hash(password, 10);
          updateData.password = hashed;
        }

        await User.findByIdAndUpdate(userId, updateData,
            { new: true }
        );
        res.status(200).json({ message: 'Shop details updated successfully!' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }

}

const changeStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const userStatus = await UserStatus.findOne({userId});
        if (userStatus.status === "active") {
            userStatus.status = "suspended";
        } else {
            userStatus.status = "active";
        }
        await userStatus.save();
        res.status(200).json(userStatus.status)
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }
}

const deleteShop = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Shop not found" })
        }
        const delUser = await User.findByIdAndDelete(userId);
        if (!delUser) {
            return res.status(404).json({ msg: "Shop not found" })
        }
        await UserStatus.deleteOne({ userId });
        await Product.deleteMany({ userId });
        await Sale.deleteMany({ userId });
        await Purchase.deleteMany({ userId });
        await Udhaar.deleteMany({ userId });
        await Expense.deleteMany({ userId });
        await Report.deleteMany({ userId });
        res.status(200).json({ msg: "Shop deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }
}

export { getAdminDashboard, deleteShop, editUserProfile, changeStatus };
