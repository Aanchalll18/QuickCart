import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/adminRoute.js';
import connectcloudinary from './config/cloudniary.js';

const app=express();
const port =process.env.PORT || 4000;

await connectDb()
await connectcloudinary()

const allowedOrigins=['http://localhost/5173']



app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials:true}))

app.get('/',(req,res)=>res.send("API WORKING"));
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})