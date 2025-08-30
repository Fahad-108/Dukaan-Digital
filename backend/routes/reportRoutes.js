import express from 'express';
import auth from '../middlewares/auth.js';
import { getReport } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', auth, getReport);

export default router;