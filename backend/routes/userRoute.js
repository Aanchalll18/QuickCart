import express from 'express'
import { isAuth, login, logout, register } from '../controllers/UserController.js';
import authUser from '../middlewares/authuser.js';


const userRouter=express.Router();
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/isAuth',authUser,isAuth)
userRouter.get('/logout',authUser,logout)

export default userRouter;