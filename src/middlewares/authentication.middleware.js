const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get('authorization');

    if (!authHeader) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];

    let decodedToken;

    decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        data: null,
        success: false,
        message: 'Not authenticated',
      });
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
