const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sendEmail = require('../utils/email');
const crypto = require('crypto');


const home = (req, res) => {
    res.send("Welcome to the home page! from controller");
  };
  const getUsers = async (req, res) => {
    try {
      const results = await User.find();
      
      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.error('Error:', error.message);
    } 
  }


  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { userId: user._id }, // Include the _id in the token payload
        config.secretKey,
        { expiresIn: '1h' }
      );
      
      res.status(200).json({ token, userId: user._id }); // Send _id along with the token
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }  
  
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    if (
      error.message.includes('duplicate key error') ||
      error.name === 'MongoError' ||
      error.name === 'BulkWriteError'
    ) {
      res.status(409).json({
        message: 'User with the same email or username already exists.',
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the ID is passed as a route parameter

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'User not found' });
  }
};


const asyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const forgotPassword = asyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const error = new Error('User not found', 404);
    return next(error);
  }

  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/auth/v1/user/resetPassword/${resetToken}`;
  const message = `Please reset your password by clicking on the link below:\n\n ${resetUrl}\n\nIf you did not request this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset Password',
      message: message,
    });
    res.status(200).json({ success: true, message: 'Reset email sent successfully' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new Error('Email could not be sent', 500));
  }
});

const asyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const resetPassword = asyncErrorHandler(async (req, res, next) => {

  const token = crypto.createHash('sha256').update(req.params.token).digest('hex');


  const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });

  if (!user) {
    const error = new Error('Token is invalid or has expired');
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user.password = hashedPassword;
  user.confirmPassword = hashedPassword;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  user.passwordChangedAt = Date.now();

  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
});

  module.exports = {
    home, register, loginUser, getUsers, forgotPassword, resetPassword, getUserById
  };