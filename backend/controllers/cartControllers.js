import User from "../models/UserSchema";

export const updateCart=async(req,res)=>{
    try {
        const {userId,cartItem}=req.body
        await User.findByIdAndUpdate(userId,{cartItem})
        return res.json({
            success:true,
            message:'cart updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:'failed to update cart'
        })
        
    }
}