import jwt from 'jsonwebtoken';

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are mandatory',
      });
    }

    const isValidSeller =
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD;

    if (!isValidSeller) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const sellerToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('sellerToken', sellerToken, {
      httpOnly: true,
      secure: true,
      sameSite:  'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: 'Seller logged in successfully!',
    });
  } catch (error) {
    console.error('Seller login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
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
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
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
