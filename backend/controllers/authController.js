import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import UserStatus from '../models/UserStatus.js';

const register = async (req, res) => {
    try {
        const { name, email, password, role, phone, shopname, address } = req.body;

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(401).json({ message: 'Email already exists' });
        }
        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, email, password: hashed, role, phone, shopname, address
        });
        const saverUser = await newUser.save();
        await UserStatus.create({
            userId: saverUser._id,
            status: "active"
        })

        const token = jwt.sign({ id: saverUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ message: 'User registered successfully!', token: token });
    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const userststus = await UserStatus.findOne({userId : user._id})
        if(userststus.status == "suspended"){
            return res.status(400).json({ message: 'Your Account is suspended' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                name: user.name,
                shopname: user.shopname,
                phone: user.phone,
                address: user.address,
                email: user.email,
                role: user.role,
            }
        })
    }
    catch (err) {
        console.error("Save Error:", err);
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

export {
    register,
    login
};