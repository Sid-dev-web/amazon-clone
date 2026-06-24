const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Prevents duplicate registrations
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true }); // Automatically tracks when users register

module.exports = mongoose.model('User', userSchema);