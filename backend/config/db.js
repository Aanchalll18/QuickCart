import mongoose from "mongoose";

const connectDb=async()=>{
    try {
       await mongoose.connection.on('connected',()=>console.log("db connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/GreenCart`)
    } catch (error) {
        console.log("error while connecting to db")
    }
}

export default connectDb;