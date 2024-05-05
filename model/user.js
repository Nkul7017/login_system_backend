const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Password is not required for Google sign-in
  googleId: { type: String, unique: true }, // Store Google ID
  displayName: { type: String }, // Store display name from Google profile
  // Add any other fields you want to store from the Google profile
});

module.exports = mongoose.model('User', userSchema);
