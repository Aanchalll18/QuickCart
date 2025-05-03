import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Make email lowercase before checking
    const normalizedEmail = email.toLowerCase();

    // Check if user exists with the same email
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name: name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User Registered",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login =async (req,res)=>{
    try {
        const {email,password}=req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are mandatory"
            });
        }
        const user=await User.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid Password"
            })
        }

         // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      // Set token in a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

        return res.status(200).json({
            success:true,
            message:"User Successfully logged in",
            user:{email:user.email,name:user.name}
        })
        
    } catch (error) {
       console.log(error);
       return res.status(404).json({
        success:false,
        "message":"failed to login"
       })
    }
}

export const isAuth = async (req, res) => {
    try {
      const userId = req.userId;
    //   console.log("User ID from token:", userId);

      const user = await User.findById(userId).select("-password");
      return res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
} 
};
  
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};
