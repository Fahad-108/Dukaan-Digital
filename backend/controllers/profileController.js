import Expense from "../models/Expense.js";
import Product from "../models/Product.js";
import Purchase from "../models/Purchase.js";
import Report from "../models/Report.js";
import Sale from "../models/Sale.js";
import Udhaar from "../models/Udhaar.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

const getProfile = async (req,res) => {
    try {
        const id = req.user;
        const user = await User.findById(id);

        if( !user ) {
            return res.status(400).json({ message: 'User not found'});
        }

        res.status(201).json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                shopname: user.shopname,
                phone : user.phone,
                address: user.address,
                createdAt : user.createdAt
            }
        })
    }
    catch(err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}

const getAllUsers = async (req,res) => {
    try {
        const id = req.user;
        const user = await User.findById(id);

        if( !user ) {
            return res.status(400).json({ message: 'User not found'});
        }

        if(user.role === 'admin')
        {
            const allUsers = await User.find().select('-password');
            res.status(200).json(allUsers);
        }
        else {
            res.status(403).json({ message: 'Access denied'});
        }
    }
    catch(err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        const userId = req.user;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        const updateData = { name, phone };
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            updateData.password = hashed;
        }
        await User.findByIdAndUpdate(userId, updateData,
            { new: true }
        );
        res.status(200).json({ message: 'User profile updated successfully!' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }
}

const deleteUser = async (req, res) => {
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }
    const delUser = await User.findByIdAndDelete(userId);
    if (!delUser) {
        return res.status(404).json({ msg: "User not found" })
    }
    await Product.deleteMany({ userId });
    await Sale.deleteMany({ userId });
    await Purchase.deleteMany({ userId });
    await Udhaar.deleteMany({ userId });
    await Expense.deleteMany({ userId });
    await Report.deleteMany({ userId });
    res.status(200).json({ msg: "User deleted successfully" })
}

export {
    getProfile,
    getAllUsers,
    updateProfile,
    deleteUser
};