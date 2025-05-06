// import jwt from 'jsonwebtoken'
// const authUser=async(req,res,next)=>{
//     // const {token}=req.cookies;
//     let token = req.cookies.token;

//     console.log("auth",token)
//     if(!token){
//         return res.json({
//             success:false,
//             message:"User not authorized"
//         })
//     }
//     try {
//         const decode=jwt.verify(token,process.env.JWT_SECRET)
//         if(decode.id){
//             req.userId=decode.id;
//         }else{
//             return res.json({
//                 success:false,
//                 message:"Invalid token"
//             })
//         }
//         next()
//     } catch (error) {
//        res.json({
//         success:false,
//         message:error.message
//        }) 
//     }
// }
// export default authUser;




import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("auth", token);

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, token missing" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = tokenDecode.id; // Store decoded userId in req
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authuser;
