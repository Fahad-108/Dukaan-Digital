import express from 'express';
import Auth from '../middlewares/auth.js';
import { addExpense, deleteExpense, getExpenses } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', Auth, addExpense);
router.get('/', Auth, getExpenses);
router.delete('/:id', Auth, deleteExpense);

export default router;