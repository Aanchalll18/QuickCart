import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import 'dotenv/config'

const app=express();
const port =process.env.PORT || 4000;

await connectDb()

const allowedOrigins=['http://localhost/5173']



app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials:true}))

app.get('/',(req,res)=>res.send("API WORKING"));

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})