import express from 'express';
import Auth from '../middlewares/auth.js';
import { addUdhaar, deleteUdhaar, getUdhaarById, getUdhaarList, updateUdhaar } from '../controllers/udhaarRoutes.js';

const router = express.Router();

router.post('/', Auth, addUdhaar);
router.get('/', Auth, getUdhaarList);
router.get('/:id', Auth, getUdhaarById);
router.put('/:id', Auth, updateUdhaar);
router.delete('/:id', Auth, deleteUdhaar);

export default router;