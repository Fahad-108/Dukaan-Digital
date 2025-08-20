import express from 'express';
import Auth from '../middlewares/auth.js';
import { getReport } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', Auth, getReport);

export default router;