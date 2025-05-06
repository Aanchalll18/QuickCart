import User from "../models/UserSchema.js";

export const updateCart=async(req,res)=>{
    try {
        const {userId} = req.body;
        const {cartItem}=req.body
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

// export const updateCart = async (req, res) => {
//     try {
//         const userId = req.userId; // ✅ now retrieved from token
//         const { cartItem } = req.body;

//         if (!userId || !cartItem) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Missing userId or cartItem',
//             });
//         }

//         await User.findByIdAndUpdate(userId, { cartItem });

//         return res.json({
//             success: true,
//             message: 'Cart updated successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         return res.json({
//             success: false,
//             message: 'Failed to update cart',
//         });
//     }
// };
