const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

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
    const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
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

const asyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const forgotPassword = asyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const error = new CustomError('User not found', 404);
    return next(error);
  }

  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });
});
  
  
 
  module.exports = {
    home, register, loginUser, getUsers, forgotPassword
  };