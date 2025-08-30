import express from 'express';
import auth from '../middlewares/auth.js';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', auth, addProduct);
router.get('/', auth, getProducts);
router.get('/:id', auth, getProductById);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router;