const express = require('express');
const router = express.Router();
const multer = require('multer');
const userProfileController = require('../controllers/user_profile_controller');
const path = require("path");

// Set up multer diskStorage with your custom configuration
const storage = multer.diskStorage({
    destination: './uploads/images', // Corrected destination path
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize multer middleware with custom storage configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
});

router.route("/updateUserProfile").post(upload.single('file'), userProfileController.updateUserProfileUpdate);

module.exports = router;
