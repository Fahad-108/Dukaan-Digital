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

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['https://fahad-108.github.io', 'http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true     
}));

app.get('/', (req, res) => {
    res.send('Welcome to Server');
});


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

app.get("/test-env", (req, res) => {
  res.json({
    mongo: process.env.MONGO_URL ? "found" : "missing",
    jwt: process.env.JWT_SECRET ? "found" : "missing",
  });
});

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch(err => console.error('MongoDB connection error: ',err))

export default app;