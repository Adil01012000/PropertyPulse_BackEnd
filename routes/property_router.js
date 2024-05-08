const express = require("express");
const router = express.Router();

const { createProperty, getProperty, deleteProperty, updateProperty, getPropertyById, getPropertyToCompare, getPropertyFromType } = require("../controllers/property_controller");

router.route("/createProperty").post(createProperty);
router.route("/getProperty").get(getProperty);
router.route("/deleteProperty").delete(deleteProperty);
router.route("/updateProperty").put(updateProperty);
router.route("/getPropertyById").get(getPropertyById);
router.route("/getPropertyToCompare").get(getPropertyToCompare);
router.route("/getPropertyFromType").get(getPropertyFromType);

module.exports = router;