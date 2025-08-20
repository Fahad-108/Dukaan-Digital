import express from 'express';
import Auth from '../middlewares/auth.js';
import { createSale, deleteSale, getSales, getSalesById } from '../controllers/salesController.js';

const router = express.Router();

router.post('/', Auth, createSale);
router.post('/all/', Auth, getSales);
router.get('/:id', Auth, getSalesById);
router.delete('/:id', Auth, deleteSale);

export default router;