import jwt from 'jsonwebtoken';

// SELLER LOGIN
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: 'All fields are mandatory',
      });
    }

    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });



      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        success: true,
        message: 'Seller logged in successfully!',
      });
    } else {
      return res.json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// CHECK SELLER AUTH
export const isSellerAuth = async (req, res) => {
  try {
    const { sellerToken } = req.cookies;
    // console.log('isseller',sellerToken)

    if (!sellerToken) {
      return res.json({
        success: false,
        message: 'Seller not authorized',
      });
    }

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    return res.json({
      success: true,
      user: { email: decoded.email },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// SELLER LOGOUT
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
