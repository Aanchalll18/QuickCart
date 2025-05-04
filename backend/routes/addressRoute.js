import express from 'express'
import { addAddress, getAdress } from '../controllers/addressControlers.js';
import authUser from '../middlewares/authuser.js';

const addressRoute=express.Router();
addressRoute.post('/add-address',authUser,addAddress);
addressRoute.get('/address',authUser,getAdress)

export default addressRoute