const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user.js');


exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();


    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
 console.log(email,password)
  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }


    const token = jwt.sign({ userId: user._id }, 'loginsystem', { expiresIn: '1h' });


    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.fetchUserDetails = async (req, res) => {

    console.log("hello")
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
  
    try {

      const decodedToken = jwt.verify(token, 'loginsystem');
      const userId = decodedToken.userId;
  

      const user = await User.findById(userId);
       
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log(user)
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };