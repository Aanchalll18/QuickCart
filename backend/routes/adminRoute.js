import express from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/SellerControlers.js';
import authSeller from '../middlewares/authAdmin.js';


const sellerRouter=express.Router();

sellerRouter.post('/login',sellerLogin)
sellerRouter.get('/sellerAuth',authSeller,isSellerAuth);
sellerRouter.get('/logout',authSeller,sellerLogout)


export default sellerRouter;