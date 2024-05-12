const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");

const { createProperty, getProperty, deleteProperty, updateProperty, getPropertyById, getPropertyToCompare, getPropertyFromType, getPropertyForSale, getPropertyForRent, getLandForSale, getPropertyByUserId } = require("../controllers/property_controller");
const storage = multer.diskStorage({
    destination: './uploads/images', // Corrected destination path
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 100000000000000
    }
});

router.route("/createProperty").post(upload.array('propertyImages', 5), createProperty);
router.route("/getProperty").get(getProperty);
router.route("/deleteProperty").delete(deleteProperty);
router.route("/updateProperty").put(updateProperty);
router.route("/getPropertyById").post(getPropertyById);
router.route("/getPropertyToCompare").post(getPropertyToCompare);
router.route("/getPropertyFromType").get(getPropertyFromType);
router.route("/getPropertyForSale").get(getPropertyForSale);
router.route("/getPropertyForRent").get(getPropertyForRent);
router.route("/getLandForSale").get(getLandForSale);
router.route("/getPropertyByUserId").post(getPropertyByUserId);

module.exports = router;