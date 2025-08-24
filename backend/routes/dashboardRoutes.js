import express from 'express';
import Auth from '../middlewares/auth.js';
import { getDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', Auth, getDashboard);

export default router;