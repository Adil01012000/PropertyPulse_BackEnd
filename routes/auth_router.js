const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const authenticateToken = require('../middleware/authMiddleware');

router.route("/home").get(authController.home);
router.route("/register").post(authController.register);
router.route("/logIn").post(authController.loginUser);
router.route("/getUser").get(authenticateToken, authController.getUsers);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router.route("/getUserById/:id").get(authenticateToken, authController.getUserById);

module.exports = router;
