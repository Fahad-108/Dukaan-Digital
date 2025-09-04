import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js'
import profileRoutes from './routes/profileRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import productRoutes from './routes/productRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import salesRoutes from './routes/salesRoutes.js'
import udhaarRoutes from './routes/udhaarRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend origin
  credentials: true // Allow sending and receiving cookies/authentication headers
}));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/product', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/udhaar', udhaarRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/report', reportRoutes);



app.get('/', (req, res) => {
    res.send('Welcome to Dukan Digital API');
});

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch(err => console.error('MongoDB connection error: ',err))