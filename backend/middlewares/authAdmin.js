// import jwt from 'jsonwebtoken';

// const authSeller = async (req, res, next) => {
//   const  sellerToken  = req.cookies.sellerToken;
//   console.log('Seller Auth Middleware Token:', sellerToken);

//   if (!sellerToken) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not Authorized: No token provided',
//     });
//   }

//   try {
//     // Verify the actual token value
//     const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    
//     if (decoded.email === process.env.SELLER_EMAIL) {
//       req.email = decoded.email; 
//       next();
//     } else {
//       return res.status(403).json({
//         success: false,
//         message: 'Invalid Seller Credentials',
//       });
//     }
//   } catch (error) {
//     console.error('JWT Error:', error.message);
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or Expired Token',
//     });
//   }
// };

// export default authSeller;
import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  const sellerTtoken = req.cookies.sellerToken;
  console.log("d-->",sellerTtoken)

  if (!sellerTtoken) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized: No token provided',
    });
  }

  try {
    const decoded = jwt.verify(sellerTtoken, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // 🔍 See what's inside

    if (decoded.email === process.env.SELLER_EMAIL) {
      req.email = decoded.email;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Invalid Seller Credentials',
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or Expired Token',
    });
  }
};

export default authSeller;
