import express from 'express';
import auth from '../middlewares/auth.js';
import { addExpense, deleteExpense, getExpenses } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);
router.delete('/:id', auth, deleteExpense);

export default router;