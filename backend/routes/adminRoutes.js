import express from 'express';
import adminAuth from '../middlewares/adminAuth.js';
import auth from '../middlewares/auth.js'
import { changeStatus, deleteShop, getAdminDashboard, editUserProfile } from '../controllers/adminController.js';

const router = express.Router();

router.get('/', auth, adminAuth, getAdminDashboard);
router.put('/profile/:id', auth, adminAuth, editUserProfile);
router.post('/status/:id', auth, adminAuth, changeStatus);
router.delete('/:id', auth, adminAuth, deleteShop);

export default router;