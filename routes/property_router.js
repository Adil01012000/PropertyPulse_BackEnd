const express = require("express");
const router = express.Router();

const { createProperty, getProperty, deleteProperty, updateProperty, getPropertyById } = require("../controllers/property_controller");

router.route("/createProperty").post(createProperty);
router.route("/getProperty").get(getProperty);
router.route("/deleteProperty").delete(deleteProperty);
router.route("/updateProperty").put(updateProperty);
router.route("/getPropertyById").get(getPropertyById);

module.exports = router;