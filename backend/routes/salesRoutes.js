import express from 'express';
import auth from '../middlewares/auth.js';
import { createSale, deleteSale, getSales, getSalesById } from '../controllers/salesController.js';

const router = express.Router();

router.post('/', auth, createSale);
router.post('/all/', auth, getSales);
router.get('/:id', auth, getSalesById);
router.delete('/:id', auth, deleteSale);

export default router;