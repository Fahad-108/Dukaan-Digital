import express, { Router } from 'express';
import Auth from '../middlewares/auth.js';
import { addPurchase } from '../controllers/purchaseController.js';
const router = express.Router();

router.post('/', Auth, addPurchase);

export default router;