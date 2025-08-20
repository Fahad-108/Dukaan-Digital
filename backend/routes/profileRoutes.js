import express from 'express';
import Auth from '../middlewares/auth.js';
import { getProfile, getAllUsers, updateProfile, deleteUser } from '../controllers/profileController.js';
const router = express.Router();

router.get('/', Auth, getProfile);
router.get('/alluser', Auth, getAllUsers);
router.put('/update', Auth, updateProfile);
router.delete('/delete', Auth, deleteUser);

export default router;