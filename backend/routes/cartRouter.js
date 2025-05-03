import express from 'express'
import mongoose from 'mongoose'
import authUser from '../middlewares/authuser';
import { updateCart } from '../controllers/cartControllers';


const cartRoute=mongoose.Router();

cartRoute.post('/update',authUser,updateCart);

export default cartRoute;