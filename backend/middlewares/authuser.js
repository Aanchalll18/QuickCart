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

    let token = req.cookies.token;


    console.log(token)
    if (!token) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1]; 
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
           
            req.userId = decode.id;
        } else {
            return res.json({
                success: false,
                message: "Invalid token"
            });
        }

        
        next();
    } catch (error) {
       
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default authUser;
