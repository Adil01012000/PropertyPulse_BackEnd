const bcrypt = require('bcryptjs');
const config = require('../config/config');
const UserProfileModal = require('../models/UserProfile');

async function updateUserProfileUpdate(req, res) {
    try {
        const profileData = {
            profileImage:  `http://localhost:5000/file/${req.file.filename}` ,
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

        // Save the new UserProfile object to the database
        const savedProfile = await newProfile.save();

        // Return a success response with the saved profile object
        return res.json(savedProfile);
    } catch (error) {
        // Handle any errors that occur during the saving process
        console.error("Error creating profile:", error);
        // Return an error response
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    updateUserProfileUpdate
};
