const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/loginsystem';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
