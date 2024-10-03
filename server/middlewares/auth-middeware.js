const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }
  
    try {
      // Verify token and ensure it contains the user ID
      const verified = jwt.verify(token, process.env.TOKEN_KEY_VALUE);
      console.log("Verified Token:", verified); // Log token data
  
      req.user = verified; // Attach the user info from the token to req.user
      next();
    } catch (err) {
      console.log("JWT Error:", err);
      return res.status(400).json({ message: 'Invalid Token' });
    }
  };
  
