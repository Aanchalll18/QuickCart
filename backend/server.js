import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/adminRoute.js';
import connectcloudinary from './config/cloudniary.js';
import productRouter from './routes/productRoute.js';
import cartRoute from './routes/cartRouter.js';
import addressRoute from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripewebhooks } from './controllers/orderController.js';

const app=express();
const port =process.env.PORT || 4000;

await connectDb()
await connectcloudinary()

const allowedOrigins=['https://quick-cart-brown-mu.vercel.app','http://localhost:5173']

app.post('/stripe',express.raw({type:'application/json'}),stripewebhooks)



app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials:true}))

app.get('/',(req,res)=>res.send("API WORKING"));
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRoute);
app.use('/api/address',addressRoute);
app.use('/api/orders',orderRouter)

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})