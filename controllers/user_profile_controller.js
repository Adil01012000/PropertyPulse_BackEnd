const bcrypt = require('bcryptjs');
const config = require('../config/config');
const UserProfileModal = require('../models/UserProfile');

async function updateUserProfileUpdate(req, res) {
    try {
        const profileImages = req.files.map(file => `http://localhost:5000/profile/${file.filename}`);

        const profileData = {
            profileImage: profileImages, 
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            position: req.body.position,
            language: req.body.language,
            companyName: req.body.companyName,
            taxNumber: req.body.taxNumber,
            address: req.body.address,
            about: req.body.about
        };
        const newProfile = new UserProfileModal(profileData);

        const savedProfile = await newProfile.save();
        return res.json(savedProfile);
    } catch (error) {
        console.error("Error creating profile:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    updateUserProfileUpdate
};
