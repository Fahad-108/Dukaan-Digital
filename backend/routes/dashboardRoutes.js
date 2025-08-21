import express from 'express';
import Auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', Auth);

export default router;