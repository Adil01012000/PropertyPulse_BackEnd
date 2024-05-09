const express = require("express");
const router = express.Router();

const { createContactUs } = require("../controllers/contactus_controller");

router.route("/createContactUs").post(createContactUs);

module.exports = router;