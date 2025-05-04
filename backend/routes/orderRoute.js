import express from 'express'
import authUser from '../middlewares/authuser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderSTRIPE } from '../controllers/orderController.js';


const orderRouter=express.Router()
orderRouter.post('/cod',authUser,placeOrderCOD);
orderRouter.post('/stripe',authUser,placeOrderSTRIPE);
orderRouter.get('/user',authUser,getUserOrders);
orderRouter.get('/seller',authUser,getAllOrders)


export default orderRouter;