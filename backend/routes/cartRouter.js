import express from 'express'
import mongoose from 'mongoose'
import authUser from '../middlewares/authuser.js';
import { updateCart } from '../controllers/cartControllers.js';


const cartRoute=express.Router();

cartRoute.post('/update',authUser,updateCart);

export default cartRoute;