import Address from "../models/addressModel.js";

export const addAddress=async(req,res)=>{
    try {
        const userId = req.userId;
        const {address}=req.body;
    await Address.create({...address,userId})
    res.json({
        success:true,
        message:'address added successfully'
    })
    } catch (error) {
        console.log(error.message)
        return res.json({
            success:false,
            message:error.message
        })
    }
};

export const getAdress=async(req,res)=>{
    try {
        const {userId}=req;
        console.log(userId)

        const addresses = await Address.find({ userId: req.userId });

        res.json({
            success:true,
            addresses
        })
    } catch (error) {
       console.log(error);
       res.json({
        message:error.message
       }) 
    }
};
