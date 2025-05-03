import jwt from 'jsonwebtoken'
const authUser=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.json({
            success:false,
            message:"User not authorized"
        })
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decode)
        if(decode){
            req.userId=decode.id;
        }else{
            return res.json({
                success:false,
                message:"Invalid token"
            })
        }
        next()
    } catch (error) {
       res.json({
        success:false,
        message:error.message
       }) 
    }
}
export default authUser;