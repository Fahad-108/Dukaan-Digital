import express, { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addPurchase, getPurchases } from '../controllers/purchaseController.js';
const router = express.Router();

router.post('/', auth, addPurchase);
router.post('/all', auth, getPurchases);

export default router;