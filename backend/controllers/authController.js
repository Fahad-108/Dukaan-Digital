import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const register =  async (req,res) => {
    try {
        const { name, email, password, role, phone, shopname, address } = req.body;

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: 'Email already exists'});
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashed, role, phone, shopname, address });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.status(201).json({ message: 'User registered successfully!', token: token});
    }
    catch(err) {
        res.status(500).json({message: 'Server error: ', error: err.message});
    }
}

const login = async (req,res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if( !isMatch ) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});

        res.status(201).json({
            message: 'Login successfull!',
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                role: user.role,
                address: user.address,
                shopname: user.shopname,
            }
        })
    }
    catch(err) {
        res.status(500).json({message: 'Server error: ', error: err.message});
    }
}

export {
    register,
    login
};