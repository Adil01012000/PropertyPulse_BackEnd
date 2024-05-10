const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    profileImage: String,
    username: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: String,
    firstName: String,
    lastName: String,
    position: String,
    language: String,
    companyName: String,
    taxNumber: String,
    address: String,
    about: String
  });

   
   const UserProfile = mongoose.model('UserProfile', userProfileSchema);
   module.exports = UserProfile;