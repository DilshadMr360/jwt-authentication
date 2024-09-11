import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};

// Login user and return token
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request with:', { email, password });

  try {
    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token);

    // Respond with success, token, and user details
    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};

export { register, login };
