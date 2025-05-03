import express from 'express'
import {upload} from '../config/multer.js'
import { addProduct, changeStock, productById, productList } from '../controllers/ProductController.js';
import authSeller from '../middlewares/authAdmin.js';

const productRouter=express.Router();

productRouter.post('/add-product', upload.array('images'),authSeller, addProduct); 
productRouter.get('/list',productList);
productRouter.get('/id',productById);
productRouter.post('/stock',authSeller,changeStock)


export default productRouter;