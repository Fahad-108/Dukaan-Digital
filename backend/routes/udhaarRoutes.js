import express from 'express';
import auth from '../middlewares/auth.js';
import { addUdhaar, deleteUdhaar, getUdhaarById, getUdhaarList, updateUdhaar } from '../controllers/udhaarRoutes.js';

const router = express.Router();

router.post('/', auth, addUdhaar);
router.get('/', auth, getUdhaarList);
router.get('/:id', auth, getUdhaarById);
router.put('/:id', auth, updateUdhaar);
router.delete('/:id', auth, deleteUdhaar);

export default router;