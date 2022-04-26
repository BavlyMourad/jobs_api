// 13th File

const express = require("express")
const router = express.Router()

const { registerUser, loginUser } = require("../controllers/authController")

// Route to register user
router.route("/register").post(registerUser)

// Route to login user
router.route("/login").post(loginUser)

module.exports = router
