// 13th File

const express = require("express")
const router = express.Router()

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/authController")

// Route to register user
router.route("/register").post(registerUser)

// Route to login user
router.route("/login").post(loginUser)

// Route to forgot password
router.route("/password/forgot").post(forgotPassword)

// Route to reset password
router.route("/password/reset/:token").put(resetPassword)

// Route to logout
router.route("/logout").get(logout)

module.exports = router
