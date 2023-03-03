import express from 'express';
import productController from '../controllers/product.controller';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/items/:id', productController.getProductDetail);

export { router as productRouter };