import express, { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addPurchase, getPurchases, deletePurchase } from '../controllers/purchaseController.js';
const router = express.Router();

router.post('/', auth, addPurchase);
router.post('/all', auth, getPurchases);
router.delete('/:id', auth, deletePurchase);

export default router;