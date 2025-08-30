import express from 'express';
import auth from '../middlewares/auth.js';
import { getProfile, getAllUsers, updateProfile, deleteUser } from '../controllers/profileController.js';
const router = express.Router();

router.get('/', auth, getProfile);
router.get('/alluser', auth, getAllUsers);
router.put('/update', auth, updateProfile);
router.delete('/delete', auth, deleteUser);

export default router;