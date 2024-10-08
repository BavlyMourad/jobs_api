// 12th File

const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  role: {
    type: String,
    enum: {
      values: ["user", "employeer"],
      message: "Please select correct role",
    },
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Your password must be at least 8 characters long"],
    select: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
})

// Encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Return JSON Web Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  })
}

// Compare user entered password and database saved password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate password reset token
userSchema.methods.getPasswordResetToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex")

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  // Set token expire time (expire time in 30 minutes, minutes * seconds * milliseconds = 30*60*1000)
  this.resetPasswordExpire = Date().now + 30 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model("User", userSchema)
