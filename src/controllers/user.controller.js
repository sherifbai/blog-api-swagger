const User = require('../models/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      const error = new Error('User already exist!');
      error.statusCode = 403;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      username: username,
      password: hashedPw,
    });

    const savedUser = await user.save();

    savedUser.password = null;

    return res.status(201).json({
      data: savedUser,
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error('User does not found!');
      error.statusCode = 404;
      throw error;
    }

    const isEqualPw = await bcrypt.compare(password, user.password);

    if (!isEqualPw) {
      const error = new Error('Passwords does not match');
      error.statusCode = 403;
      throw error;
    }

    user.password = null;

    const token = jwt.sign(
      {
        username: user.username,
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    return res.status(200).json({
      data: user,
      success: true,
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    next(error);
  }
};
