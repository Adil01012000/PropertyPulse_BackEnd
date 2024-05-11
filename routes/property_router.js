const express = require("express");
const router = express.Router();

const { createProperty, getProperty, deleteProperty, updateProperty, getPropertyById, getPropertyToCompare, getPropertyFromType, getPropertyForSale, getPropertyForRent, getLandForSale, getPropertyByUserId } = require("../controllers/property_controller");

router.route("/createProperty").post(createProperty);
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