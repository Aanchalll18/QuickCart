// import jwt from 'jsonwebtoken'
// const authUser=async(req,res,next)=>{
//     const {token}=req.cookies;
//     console.log(token)
//     if(!token){
//         return res.json({
//             success:false,
//             message:"User not authorized"
//         })
//     }
//     try {
//         const decode=jwt.verify(token,process.env.JWT_SECRET)
//         // console.log(decode)
//         if(decode){
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

const authUser = async (req, res, next) => {
    // 1. Check if the token is in cookies
    let token = req.cookies.token;

    // 2. If no token in cookies, check the Authorization header
    if (!token) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        }
    }

    // If token is still not found, return unauthorized error
    if (!token) {
        return res.json({
            success: false,
            message: "User not authorized"
        });
    }

    try {
        // 3. Verify the token using JWT
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (decode) {
            // If the token is valid, attach user ID to the request object
            req.userId = decode.id;
        } else {
            return res.json({
                success: false,
                message: "Invalid token"
            });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If verification fails, return error message
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default authUser;
