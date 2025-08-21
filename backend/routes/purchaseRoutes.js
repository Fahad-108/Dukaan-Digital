import express, { Router } from 'express';
import Auth from '../middlewares/auth.js';
import { addPurchase, getPurchases } from '../controllers/purchaseController.js';
const router = express.Router();

router.post('/', Auth, addPurchase);
router.post('/all', Auth, getPurchases);

export default router;