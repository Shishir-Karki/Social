const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/auth_controller");
const validate = require("../middlewares/validate-middleware");
const { signUpSchema, loginSchema } = require("../validators/aauth-validators");
const verifyToken = require('../middlewares/verifyToken');

// Home route
router.route("/").get(authcontroller.home);

// Register a user
router.route("/register")
    .post(validate(signUpSchema), authcontroller.register);

// Login a user
router.route("/login")
    .post(validate(loginSchema), authcontroller.login);

// Get user profile (protected route)
router.route("/profile")
    .get(verifyToken, authcontroller.getUserProfile);

module.exports = router;
