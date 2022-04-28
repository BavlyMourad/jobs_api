// 19th File

const express = require("express")
const router = express.Router()

const {
  getUserProfile,
  updatePassword,
} = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middlewares/auth")

// Route to show current user
router.route("/me").get(isAuthenticatedUser, getUserProfile)

// Route to update user's password
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

module.exports = router
