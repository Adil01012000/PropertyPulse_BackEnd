const express = require('express');
const router = express.Router();
const multer = require('multer');
const userProfileController = require('../controllers/user_profile_controller');
const path = require("path");

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1000000
    }
});

// Serve static files from the uploads/images directory
router.use('/file', express.static(path.join(__dirname, '../uploads/images')));

router.route("/updateUserProfile").post(upload.single('file'), userProfileController.updateUserProfileUpdate);

module.exports = router;
