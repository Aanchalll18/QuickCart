import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'

const app=express();
const port =process.env.PORT || 4000;

const allowedOrigins=['http://localhost/5173']



app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials:true}))

app.get('/',(req,res)=>res.send("API WORKING"));

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})