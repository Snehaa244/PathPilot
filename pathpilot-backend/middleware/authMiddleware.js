const jwt = require('jsonwebtoken');

/**
 * Protect routes using Access Token
 * Header format: Authorization: Bearer <accessToken>
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token missing' });
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Invalid or expired access token',
        });
      }

      // Attach user info to request
    req.user = { id: decoded.id };

      next();
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = authMiddleware;
