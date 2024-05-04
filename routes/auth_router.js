const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const authenticateToken = require('../middleware/authMiddleware');


router.route("/home").get(authController.home);
router.route("/register").post(authController.register);
router.route("/logIn").post(authController.loginUser);
router.route("/getUser").get(authenticateToken,authController.getUsers);
router.route("/forgotPassword").post(authController.forgotPassword);

  

module.exports = router;
