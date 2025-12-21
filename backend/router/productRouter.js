import express from 'express';
import  { createProduct,getAllProducts,deleteProduct,updateProduct } from '../controller/productController.js';

const productRouter=express.Router();

productRouter.post('/',createProduct);
productRouter.get('/',getAllProducts);


productRouter.delete('/:productId',deleteProduct);
productRouter.put('/:productId',updateProduct)

export default productRouter;